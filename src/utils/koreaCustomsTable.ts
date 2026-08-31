import type { FuelType } from '@/utils/customsTaxCalculator';
import type { KoreaArrivalPort } from '@/config/koreaCalculatorConfig';

export type KoreaCustomsFuel = 'бензин' | 'дизель' | 'електро' | 'гібрид';
export type KoreaCustomsCurrency = 'EUR' | 'USD';

export type KoreaCustomsCityPrices = {
  kyiv?: number;
  odesa?: number;
};

export type KoreaCustomsEntry = {
  make: string;
  model: string;
  fuel: string;
  currency: KoreaCustomsCurrency;
  prices: Record<string, number>;
  /** Для аркуша «Полученная инф» — ціни по містах */
  cityPrices?: Record<string, KoreaCustomsCityPrices>;
};

export type KoreaCustomsLookupResult = {
  valueUsd: number;
  currency: KoreaCustomsCurrency;
  rawValue: number;
  make: string;
  model: string;
  fuel: string;
  year: number;
  source: 'whole-standard' | 'whole-fallback' | 'damaged' | 'extra';
  discountApplied: boolean;
};

export type KoreaCustomsTables = {
  wholeStandard: KoreaCustomsEntry[];
  wholeFallback: KoreaCustomsEntry[];
  damaged: KoreaCustomsEntry[];
  extra: KoreaCustomsEntry[];
};

function normalizeKey(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[-_/]+/g, ' ')
    .replace(/\s+/g, ' ');
}

/** Мапінг типу палива форми → ключі в митній таблиці (порядок пріоритету). */
export function mapFuelToTableFuels(fuelType: FuelType): string[] {
  switch (fuelType) {
    case 'diesel':
      return ['дизель'];
    case 'electric':
      return ['електро'];
    case 'hybrid':
      return ['гібрид', 'бензин'];
    case 'petrol':
    default:
      return ['бензин'];
  }
}

function resolveRawPrice(
  entry: KoreaCustomsEntry,
  year: number,
  arrivalPort?: KoreaArrivalPort
): number | null {
  const yearKey = String(year);
  const city = entry.cityPrices?.[yearKey];

  if (city) {
    if (arrivalPort === 'odesa') {
      return city.odesa ?? city.kyiv ?? null;
    }
    return city.kyiv ?? city.odesa ?? null;
  }

  const rawValue = entry.prices[yearKey];
  if (rawValue == null || Number.isNaN(Number(rawValue))) return null;
  return Number(rawValue);
}

function lookupInTable(
  table: KoreaCustomsEntry[],
  make: string,
  model: string,
  fuelType: FuelType,
  year: number,
  eurToUsdRate: number,
  source: KoreaCustomsLookupResult['source'],
  arrivalPort?: KoreaArrivalPort,
  applyDiscount = false
): KoreaCustomsLookupResult | null {
  const makeKey = normalizeKey(make);
  const modelKey = normalizeKey(model);
  const fuelCandidates = mapFuelToTableFuels(fuelType);
  const matchingVehicle = table.filter(
    (entry) =>
      normalizeKey(entry.make) === makeKey &&
      normalizeKey(entry.model) === modelKey
  );

  const exactFuel = matchingVehicle.filter((entry) =>
    fuelCandidates.includes(entry.fuel.toLowerCase())
  );
  const genericFuel = matchingVehicle.filter(
    (entry) => entry.fuel.toLowerCase() === 'будь-яке'
  );
  const candidates = exactFuel.length ? exactFuel : genericFuel;

  const resolved = candidates
    .map((entry) => {
      const value = resolveRawPrice(entry, year, arrivalPort);
      if (value == null) return null;
      const valueUsd =
        entry.currency === 'EUR'
          ? parseFloat((value * eurToUsdRate).toFixed(2))
          : value;
      return { entry, value, valueUsd };
    })
    .filter(
      (
        item
      ): item is {
        entry: KoreaCustomsEntry;
        value: number;
        valueUsd: number;
      } => item != null
    )
    .sort((a, b) => b.valueUsd - a.valueUsd)[0];

  if (!resolved) return null;
  const { entry, value } = resolved;
  const valueUsd = applyDiscount
    ? parseFloat((resolved.valueUsd * 0.8).toFixed(2))
    : resolved.valueUsd;

  return {
    valueUsd,
    currency: entry.currency,
    rawValue: value,
    make: entry.make,
    model: entry.model,
    fuel: entry.fuel,
    year,
    source,
    discountApplied: applyDiscount,
  };
}

/**
 * Ціла: «Полученная инф» → 8703/електрика → extra 8703 → введена ціна.
 * Бита: таблиця битих → «Полученная инф» → 8703/електрика → extra 8703 (усі −20%) → введена ціна.
 * Якщо немає ніде — null; fallback введеної ціни застосовує компонент.
 */
export function findCustomsBaseValue(
  make: string,
  model: string,
  fuelType: FuelType,
  year: number,
  eurToUsdRate: number = 1.08,
  tables: KoreaCustomsTables | null,
  arrivalPort?: KoreaArrivalPort,
  isDamaged = false
): KoreaCustomsLookupResult | null {
  if (!make || !model || !year || !tables) return null;

  const lookup = (
    table: KoreaCustomsEntry[],
    source: KoreaCustomsLookupResult['source'],
    discount = false
  ) =>
    lookupInTable(
      table,
      make,
      model,
      fuelType,
      year,
      eurToUsdRate,
      source,
      arrivalPort,
      discount
    );

  if (isDamaged) {
    return (
      lookup(tables.damaged, 'damaged') ||
      lookup(tables.wholeStandard, 'whole-standard', true) ||
      lookup(tables.wholeFallback, 'whole-fallback', true) ||
      lookup(tables.extra || [], 'extra', true)
    );
  }

  return (
    lookup(tables.wholeStandard, 'whole-standard') ||
    lookup(tables.wholeFallback, 'whole-fallback') ||
    lookup(tables.extra || [], 'extra')
  );
}

/**
 * Конвертація вартості авто з Кореї в USD.
 * Для KRW: (вартість + прихований податок) / курс — податок користувач не бачить.
 */
export function convertKoreaCarCostToUsd(
  amount: number,
  currency: 'KRW' | 'USD',
  hiddenTaxKrw: number,
  krwToUsdRate: number
): number {
  if (!amount || amount <= 0) return 0;
  if (currency === 'USD') return amount;
  return parseFloat(((amount + hiddenTaxKrw) / krwToUsdRate).toFixed(2));
}

/**
 * Митна база, якщо авто немає в таблицях (ціла і бита).
 * KRW: (ціна + 440 000) / 1440 + 1600$
 * USD: ціна + 1600$
 */
export function convertKoreaCustomsFallbackUsd(
  amount: number,
  currency: 'KRW' | 'USD',
  hiddenTaxKrw: number,
  krwToUsdRate: number,
  usdAdd: number
): number {
  if (!amount || amount <= 0) return 0;
  const converted =
    currency === 'USD' ? amount : (amount + hiddenTaxKrw) / krwToUsdRate;
  return parseFloat((converted + usdAdd).toFixed(2));
}

export function getKoreaOurServicesFee(
  carCostUsd: number,
  brackets: { under10000: number; under15000: number; over15000: number }
): number {
  if (!carCostUsd || carCostUsd <= 10000) return brackets.under10000;
  if (carCostUsd <= 15000) return brackets.under15000;
  return brackets.over15000;
}
