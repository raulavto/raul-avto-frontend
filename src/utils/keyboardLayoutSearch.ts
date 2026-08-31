/**
 * Пошук без прив’язки до розкладки клавіатури (QWERTY ↔ ЙЦУКЕН).
 * Приклад: «еч» → «tx», «йцукен» → «qwerty».
 */

const CYR_TO_LAT: Record<string, string> = {
  й: 'q',
  ц: 'w',
  у: 'e',
  к: 'r',
  е: 't',
  н: 'y',
  г: 'u',
  ш: 'i',
  щ: 'o',
  з: 'p',
  х: '[',
  ъ: ']',
  ї: ']',
  ф: 'a',
  ы: 's',
  і: 's',
  в: 'd',
  а: 'f',
  п: 'g',
  р: 'h',
  о: 'j',
  л: 'k',
  д: 'l',
  ж: ';',
  э: "'",
  є: "'",
  я: 'z',
  ч: 'x',
  с: 'c',
  м: 'v',
  и: 'b',
  т: 'n',
  ь: 'm',
  б: ',',
  ю: '.',
  ё: '`',
  ґ: '\\',
};

const LAT_TO_CYR: Record<string, string> = Object.fromEntries(
  Object.entries(CYR_TO_LAT).map(([cyr, lat]) => [lat, cyr])
);

function mapChars(value: string, table: Record<string, string>): string {
  return value
    .split('')
    .map((ch) => {
      const lower = ch.toLowerCase();
      const mapped = table[lower];
      if (!mapped) return ch;
      return ch === lower ? mapped : mapped.toUpperCase();
    })
    .join('');
}

/** Варіанти рядка для порівняння: як введено + перемикання розкладки. */
export function getLayoutSearchVariants(query: string): string[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const toLat = mapChars(normalized, CYR_TO_LAT).toLowerCase();
  const toCyr = mapChars(normalized, LAT_TO_CYR).toLowerCase();

  return Array.from(new Set([normalized, toLat, toCyr]));
}

/** Чи містить текст запит з урахуванням іншої розкладки. */
export function matchesLayoutInsensitive(
  text: string,
  query: string
): boolean {
  const normalized = query.trim();
  if (!normalized) return true;

  const haystack = text.toLowerCase();
  return getLayoutSearchVariants(normalized).some((variant) =>
    haystack.includes(variant)
  );
}
