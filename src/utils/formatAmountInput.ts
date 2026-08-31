/**
 * Live thousand-separators for amount inputs.
 * Display uses spaces (e.g. 16 000 000); calculations must use parseAmountInput().
 */

const SEPARATOR = ' ';

/** Keep digits only; strip leading zeros (except a lone 0 while typing is rare for prices). */
export function stripAmountDigits(value: string): string {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return '';
  return digits.replace(/^0+(?=\d)/, '');
}

/** Format raw or already-formatted input for display: 16000000 → "16 000 000" */
export function formatAmountInput(value: string): string {
  const digits = stripAmountDigits(value);
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATOR);
}

/** Parse display value to a number for calculations: "16 000 000" → 16000000 */
export function parseAmountInput(value: string | number | null | undefined): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  const digits = stripAmountDigits(String(value ?? ''));
  if (!digits) return 0;
  return Number(digits);
}

/** Cursor index in formatted string after `digitCount` digits (from the start). */
export function amountCursorAfterDigits(
  formatted: string,
  digitCount: number
): number {
  if (digitCount <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      seen += 1;
      if (seen === digitCount) return i + 1;
    }
  }
  return formatted.length;
}
