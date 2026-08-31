import type {
  KoreaCustomsCurrency,
  KoreaCustomsEntry,
} from '@/utils/koreaCustomsTable';
import carBrandsModels from '@/data/carBrandsModels.json';

function parseNumber(value: unknown): number | null {
  if (value == null || value === '') return null;
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  const s = String(value)
    .trim()
    .replace(/\u00a0/g, ' ')
    .replace(/\s/g, '')
    .replace(',', '.');
  if (!s || s === '-') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeModel(value: unknown): string {
  const model = normalizeText(value);
  if (!model) return model;
  const asFloat = Number(model);
  if (Number.isFinite(asFloat) && asFloat === Math.trunc(asFloat)) {
    return String(Math.trunc(asFloat));
  }
  return model;
}

export function normalizeFuel(raw: unknown): string | null {
  if (raw == null) return null;
  const s = String(raw).trim().toLowerCase();
  if (!s) return null;
  if (s === 'б' || s === 'b') return 'бензин';
  if (s === 'д' || s === 'd') return 'дизель';
  if (s.includes('електр') || s.includes('electr')) return 'електро';
  if (s.includes('дизел') || s.includes('diesel')) return 'дизель';
  if (s.includes('гібрид') || s.includes('гибрид') || s.includes('hybrid')) {
    return 'гібрид';
  }
  if (s.includes('бензин') || s.includes('petrol') || s.includes('gasoline')) {
    return 'бензин';
  }
  return s;
}

function parseRiskPrice(
  value: unknown
): { value: number; currency: KoreaCustomsCurrency } | null {
  if (value == null || value === '') return null;
  if (typeof value === 'number') {
    return Number.isFinite(value) ? { value, currency: 'USD' } : null;
  }

  const text = String(value).trim();
  if (!text) return null;
  const compact = text.replace(/\u00a0/g, ' ').replace(/\s/g, '');
  const matches = compact.match(/\d+(?:[.,]\d+)?/g);
  if (!matches?.length) return null;

  const values = matches
    .map((part) => Number(part.replace(',', '.')))
    .filter((number) => Number.isFinite(number) && number > 100);
  if (!values.length) return null;

  return {
    value: Math.max(...values),
    currency: /євро|евро|eur|€/i.test(text) ? 'EUR' : 'USD',
  };
}

function mergePrice(
  merged: Map<string, KoreaCustomsEntry>,
  make: string,
  model: string,
  fuel: string,
  year: number,
  price: number,
  currency: KoreaCustomsCurrency
) {
  const key = `${make.toUpperCase()}|${model.toUpperCase()}|${fuel}|${currency}`;
  const existing = merged.get(key) || {
    make,
    model,
    fuel,
    currency,
    prices: {},
  };
  const yearKey = String(year);
  const current = existing.prices[yearKey];
  existing.prices[yearKey] =
    current == null ? price : Math.max(current, price);
  merged.set(key, existing);
}

const knownMakes = Object.keys(carBrandsModels).sort(
  (a, b) => b.length - a.length
);

function parseCombinedMakeModel(
  raw: unknown
): { make: string; model: string } | null {
  const text = normalizeText(raw);
  if (!text) return null;
  const upper = text.toUpperCase();

  const make = knownMakes.find((candidate) => {
    const candidateUpper = candidate.toUpperCase();
    return (
      upper === candidateUpper ||
      upper.startsWith(`${candidateUpper} `) ||
      upper.startsWith(`${candidateUpper},`)
    );
  });
  if (!make) return null;

  let remainder = text.slice(make.length).trim().replace(/^[-,:]\s*/, '');
  const models = (
    carBrandsModels[make as keyof typeof carBrandsModels] as string[]
  ).sort((a, b) => b.length - a.length);
  const remainderUpper = remainder.toUpperCase();
  const catalogModel = models.find((candidate) => {
    const candidateUpper = candidate.toUpperCase();
    if (!remainderUpper.startsWith(candidateUpper)) return false;
    const next = remainder[candidate.length] || '';
    return !next || /[\s,()/-]/.test(next);
  });

  if (catalogModel) return { make, model: catalogModel };

  remainder = remainder
    .split(',')[0]
    .replace(/\b\d+(?:[.,]\d+)?\s*(?:л|літр\w*|литр\w*)\b.*$/i, '')
    .trim();
  if (!remainder) return null;
  return { make, model: remainder };
}

/**
 * Аркуш «Полученная инф»:
 * марка | модель | тип | рік | Киев | Одесса
 */
export function parseKorea2026Sheet(
  rows: string[][]
): KoreaCustomsEntry[] {
  const merged = new Map<string, KoreaCustomsEntry>();

  for (const row of rows.slice(1)) {
    const make = normalizeText(row[0]);
    const model = normalizeModel(row[1]);
    const fuel = normalizeFuel(row[2]);
    const year = parseNumber(row[3]);
    const kyiv = parseNumber(row[4]);
    const odesa = parseNumber(row[5]);

    if (!make || !model || !fuel || year == null) continue;
    if (kyiv == null && odesa == null) continue;

    const yearKey = String(Math.trunc(year));
    const mapKey = `${make.toUpperCase()}|${model.toUpperCase()}|${fuel}`;
    const existing = merged.get(mapKey) || {
      make,
      model,
      fuel,
      currency: 'USD' as KoreaCustomsCurrency,
      prices: {},
      cityPrices: {},
    };

    existing.cityPrices = existing.cityPrices || {};
    existing.cityPrices[yearKey] = {
      ...(kyiv != null ? { kyiv } : {}),
      ...(odesa != null ? { odesa } : {}),
    };
    // Default price: Kyiv first, then Odessa
    existing.prices[yearKey] = kyiv ?? odesa!;

    merged.set(mapKey, existing);
  }

  return Array.from(merged.values());
}

/**
 * Аркуш виду 8703: марка | модель | тип | рік...
 * Рядок з роками може бути 2-м або 3-м (нова таблиця має заголовок + роки).
 */
export function parseYearMatrixSheet(
  rows: string[][],
  currency: KoreaCustomsCurrency
): KoreaCustomsEntry[] {
  if (rows.length < 3) return [];

  let years: Array<{ col: number; year: number }> = [];
  let yearRowIndex = 1;
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const found: Array<{ col: number; year: number }> = [];
    (rows[i] || []).forEach((cell, col) => {
      const n = parseNumber(cell);
      if (n != null && n >= 1990 && n <= 2100) {
        found.push({ col, year: Math.trunc(n) });
      }
    });
    if (found.length >= 3) {
      years = found;
      yearRowIndex = i;
      break;
    }
  }
  if (!years.length) return [];

  const entries: KoreaCustomsEntry[] = [];
  for (const row of rows.slice(yearRowIndex + 1)) {
    const make = normalizeText(row[0]);
    const model = normalizeModel(row[1]);
    const fuel = normalizeFuel(row[2]);
    if (!make || !model || !fuel) continue;

    const prices: Record<string, number> = {};
    for (const { col, year } of years) {
      const num = parseNumber(row[col]);
      if (num != null) prices[String(year)] = num;
    }
    if (Object.keys(prices).length === 0) continue;

    entries.push({ make, model, fuel, currency, prices });
  }
  return entries;
}

/**
 * Аркуш «Електрик нові»:
 * марка | модель | тип | рік | б/в $ | нові $
 */
export function parseElectricSheet(rows: string[][]): KoreaCustomsEntry[] {
  const merged = new Map<string, KoreaCustomsEntry>();
  let lastMake = '';
  let lastModel = '';
  let lastFuel = 'електро';

  for (const row of rows.slice(3)) {
    const makeRaw = normalizeText(row[0]);
    const modelRaw = normalizeModel(row[1]);
    const fuelRaw = row[2];
    const make = makeRaw || lastMake;
    const model = modelRaw || lastModel;
    const fuel = normalizeFuel(fuelRaw) || lastFuel || 'електро';
    const year = parseNumber(row[3]);
    let price = parseNumber(row[4]);
    if (price == null) price = parseNumber(row[5]);

    if (makeRaw) lastMake = make;
    if (modelRaw) lastModel = model;
    if (fuelRaw) lastFuel = fuel;

    if (!make || !model || year == null || price == null) continue;

    const yearKey = String(Math.trunc(year));
    const mapKey = `${make.toUpperCase()}|${model.toUpperCase()}|${fuel}`;
    const existing = merged.get(mapKey) || {
      make,
      model,
      fuel,
      currency: 'USD' as KoreaCustomsCurrency,
      prices: {},
    };
    existing.prices[yearKey] = price;
    merged.set(mapKey, existing);
  }

  return Array.from(merged.values());
}

/**
 * Аркуш «ПР26» таблиці битих авто:
 * статус | марка+модель | тип | об'єм | роки...
 */
export function parseDamagedPr26Sheet(
  rows: string[][]
): KoreaCustomsEntry[] {
  if (rows.length < 3) return [];
  const years: Array<{ col: number; year: number }> = [];
  (rows[1] || []).forEach((cell, col) => {
    const year = parseNumber(cell);
    if (year != null && year >= 1990 && year <= 2100) {
      years.push({ col, year: Math.trunc(year) });
    }
  });

  const merged = new Map<string, KoreaCustomsEntry>();
  for (const row of rows.slice(2)) {
    const vehicle = parseCombinedMakeModel(row[1]);
    if (!vehicle) continue;
    const fuel = normalizeFuel(row[2]) || 'будь-яке';

    for (const { col, year } of years) {
      const parsed = parseRiskPrice(row[col]);
      if (!parsed) continue;
      mergePrice(
        merged,
        vehicle.make,
        vehicle.model,
        fuel,
        year,
        parsed.value,
        parsed.currency
      );
    }
  }
  return Array.from(merged.values());
}

/**
 * Аркуш «ПР 25 рік» таблиці битих авто:
 * статус | марка | модель | тип | об'єм | роки...
 */
export function parseDamagedPr25Sheet(
  rows: string[][]
): KoreaCustomsEntry[] {
  if (rows.length < 3) return [];
  const years: Array<{ col: number; year: number }> = [];
  (rows[1] || []).forEach((cell, col) => {
    const year = parseNumber(cell);
    if (year != null && year >= 1990 && year <= 2100) {
      years.push({ col, year: Math.trunc(year) });
    }
  });

  const merged = new Map<string, KoreaCustomsEntry>();
  for (const row of rows.slice(2)) {
    const make = normalizeText(row[1]);
    const model = normalizeModel(row[2]);
    if (!make || !model) continue;
    const fuel = normalizeFuel(row[3]) || 'будь-яке';

    for (const { col, year } of years) {
      const parsed = parseRiskPrice(row[col]);
      if (!parsed) continue;
      mergePrice(
        merged,
        make,
        model,
        fuel,
        year,
        parsed.value,
        parsed.currency
      );
    }
  }
  return Array.from(merged.values());
}

export function parseDamagedSheet(
  title: string,
  rows: string[][]
): KoreaCustomsEntry[] {
  const normalizedTitle = title.trim().toUpperCase();
  const header = (rows[0] || []).map((cell) =>
    normalizeText(cell).toLowerCase()
  );
  // Визначаємо формат за колонками, тому нові аркуші теж будуть прочитані.
  if (header[1] === 'марка' && header[2] === 'модель') {
    return parseDamagedPr25Sheet(rows);
  }
  if (header[1] === 'марка' && header[2] === 'тип') {
    return parseDamagedPr26Sheet(rows);
  }
  if (normalizedTitle.includes('ПР 25')) return parseDamagedPr25Sheet(rows);
  if (normalizedTitle.includes('ПР')) return parseDamagedPr26Sheet(rows);
  return [];
}
