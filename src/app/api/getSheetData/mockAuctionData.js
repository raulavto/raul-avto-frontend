/**
 * Mock Google Sheets rows for local calculator development.
 * Structure expected by InpuDataCalculator:
 * - row[0] is skipped
 * - row[1] holds departure port names in columns B+
 * - row[2+] = [location name, price for port1, price for port2, ...]
 *   use "-" when a port is unavailable for that location
 */

const HEADER = ['Location', 'Houston', 'New York', 'Savannah', 'Los Angeles'];

const COPART_LOCATIONS = [
  ['CA - Los Angeles', '-', '-', '-', '350'],
  ['CA - Sacramento', '-', '-', '-', '420'],
  ['TX - Dallas', '280', '-', '-', '-'],
  ['TX - Houston', '220', '-', '-', '-'],
  ['NY - Newburgh', '-', '310', '-', '-'],
  ['NJ - Glassboro East', '-', '290', '360', '-'],
  ['GA - Atlanta', '-', '-', '250', '-'],
  ['FL - Miami', '-', '-', '320', '-'],
];

const IAAI_LOCATIONS = [
  ['CA - Fontana', '-', '-', '-', '380'],
  ['CA - San Diego', '-', '-', '-', '400'],
  ['TX - Fort Worth', '270', '-', '-', '-'],
  ['NY - Long Island', '-', '330', '-', '-'],
  ['NJ - Avenel', '-', '300', '370', '-'],
  ['GA - Atlanta East', '-', '-', '260', '-'],
  ['FL - Orlando', '-', '-', '340', '-'],
  ['IL - Chicago', '450', '380', '410', '-'],
];

export function getMockSheetRows(auction = 'copart') {
  const locations =
    String(auction).toLowerCase() === 'iaai' ? IAAI_LOCATIONS : COPART_LOCATIONS;

  // row 0 skipped by UI; row 1 = port names
  return [['', '', '', '', ''], HEADER, ...locations];
}
