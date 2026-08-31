import { NextResponse } from 'next/server';
import {
  getSheetValues,
  getSpreadsheetSheetTitles,
} from '../../services/sheetsService';
import {
  parseElectricSheet,
  parseDamagedSheet,
  parseKorea2026Sheet,
  parseYearMatrixSheet,
} from '@/utils/parseKoreaCustomsSheets';
import type { KoreaCustomsEntry } from '@/utils/koreaCustomsTable';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 хв

type TableStatus = {
  name: string;
  rowsLoaded: number;
  entriesParsed: number;
  sample: string[];
};

type CachePayload = {
  wholeStandard: KoreaCustomsEntry[];
  wholeFallback: KoreaCustomsEntry[];
  damaged: KoreaCustomsEntry[];
  extra: KoreaCustomsEntry[];
  status: TableStatus[];
  source: 'google';
  fetchedAt: number;
};

let cache: CachePayload | null = null;

function quote(name: string) {
  return `'${name.replace(/'/g, "''")}'`;
}

function getErrorMessage(error: unknown): string {
  if (!error) return 'Unknown error';
  if (error instanceof Error) {
    const anyErr = error as Error & {
      code?: number | string;
      errors?: Array<{ message?: string }>;
      response?: { data?: { error?: { message?: string } } };
    };
    return (
      anyErr.errors?.[0]?.message ||
      anyErr.response?.data?.error?.message ||
      anyErr.message ||
      String(error)
    );
  }
  return String(error);
}

function summarizeTable(
  name: string,
  rowsLoaded: number,
  entries: KoreaCustomsEntry[]
): TableStatus {
  return {
    name,
    rowsLoaded,
    entriesParsed: entries.length,
    sample: entries.slice(0, 3).map((entry) => {
      const years = Object.keys(entry.prices).slice(0, 3).join(',');
      return `${entry.make} ${entry.model} (${entry.fuel}${years ? `, ${years}` : ''})`;
    }),
  };
}

function logTables(status: TableStatus[]) {
  console.log('[korea-customs-table] loaded:');
  for (const table of status) {
    console.log(
      `  ${table.name}: rows=${table.rowsLoaded}, parsed=${table.entriesParsed}`,
      table.sample.length ? `sample=${table.sample.join(' | ')}` : ''
    );
  }
}

async function loadFromGoogle(): Promise<CachePayload> {
  const wholeSpreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_KOREA_CUSTOMS_ID;
  const damagedSpreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_KOREA_DAMAGED_ID;
  const extraSpreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_KOREA_EXTRA_ID ||
    '1jgOC7yFQT94tTnmOE-llPMj5bf6Z-MfiwnYFwfBEJh4';
  const primarySheet =
    process.env.GOOGLE_SHEETS_KOREA_PRIMARY_SHEET || 'Полученная инф';

  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
    throw new Error('GOOGLE_SHEETS_CLIENT_EMAIL is missing');
  }
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    throw new Error('GOOGLE_SHEETS_PRIVATE_KEY is missing');
  }
  if (!wholeSpreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_KOREA_CUSTOMS_ID is missing');
  }
  if (!damagedSpreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_KOREA_DAMAGED_ID is missing');
  }

  const [
    primaryRows,
    eurRows,
    usdRows,
    electricRows,
    damagedSheetTitles,
    extraEurRows,
    extraUsdRows,
  ] = await Promise.all([
    getSheetValues(wholeSpreadsheetId, `${quote(primarySheet)}!A1:F`),
    getSheetValues(wholeSpreadsheetId, `${quote('8703 І')}!A1:Z`),
    getSheetValues(wholeSpreadsheetId, `${quote('8703 ІІ')}!A1:Z`),
    getSheetValues(wholeSpreadsheetId, `${quote('Електрик нові')}!A1:G`),
    getSpreadsheetSheetTitles(damagedSpreadsheetId),
    getSheetValues(extraSpreadsheetId, `${quote('8703 І')}!A1:Z`),
    getSheetValues(extraSpreadsheetId, `${quote('8703 ІІ')}!A1:Z`),
  ]);

  const damagedRows = await Promise.all(
    damagedSheetTitles.map(async (title: string) => ({
      title,
      rows: await getSheetValues(
        damagedSpreadsheetId,
        `${quote(title)}!A1:Z`
      ),
    }))
  );

  const korea2026 = parseKorea2026Sheet(primaryRows);
  const sheet8703Eur = parseYearMatrixSheet(eurRows, 'EUR');
  const sheet8703Usd = parseYearMatrixSheet(usdRows, 'USD');
  const electric = parseElectricSheet(electricRows);
  const extraEur = parseYearMatrixSheet(extraEurRows, 'EUR');
  const extraUsd = parseYearMatrixSheet(extraUsdRows, 'USD');
  const damagedParsed = damagedRows.map(({ title, rows }) => ({
    title,
    rows,
    entries: parseDamagedSheet(title, rows),
  }));

  const wholeStandard = korea2026;
  const wholeFallback = [...sheet8703Eur, ...sheet8703Usd, ...electric];
  const extra = [...extraEur, ...extraUsd];
  const damaged = damagedParsed.flatMap(({ entries }) => entries);

  const status: TableStatus[] = [
    summarizeTable('Полученная инф', primaryRows.length, korea2026),
    summarizeTable('8703 І (EUR)', eurRows.length, sheet8703Eur),
    summarizeTable('8703 ІІ (USD)', usdRows.length, sheet8703Usd),
    summarizeTable('Електрик нові', electricRows.length, electric),
    ...damagedParsed.map(({ title, rows, entries }) =>
      summarizeTable(`Биті: ${title}`, rows.length, entries)
    ),
    summarizeTable('Extra 8703 І (EUR)', extraEurRows.length, extraEur),
    summarizeTable('Extra 8703 ІІ (USD)', extraUsdRows.length, extraUsd),
  ];

  logTables(status);

  return {
    wholeStandard,
    wholeFallback,
    damaged,
    extra,
    status,
    source: 'google',
    fetchedAt: Date.now(),
  };
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return NextResponse.json({
        cached: true,
        counts: {
          wholeStandard: cache.wholeStandard.length,
          wholeFallback: cache.wholeFallback.length,
          damaged: cache.damaged.length,
          extra: cache.extra.length,
        },
        status: cache.status,
        source: cache.source,
        fetchedAt: cache.fetchedAt,
        wholeStandard: cache.wholeStandard,
        wholeFallback: cache.wholeFallback,
        damaged: cache.damaged,
        extra: cache.extra,
      });
    }

    const payload = await loadFromGoogle();
    cache = payload;
    return NextResponse.json({
      cached: false,
      counts: {
        wholeStandard: payload.wholeStandard.length,
        wholeFallback: payload.wholeFallback.length,
        damaged: payload.damaged.length,
        extra: payload.extra.length,
      },
      status: payload.status,
      source: payload.source,
      fetchedAt: payload.fetchedAt,
      wholeStandard: payload.wholeStandard,
      wholeFallback: payload.wholeFallback,
      damaged: payload.damaged,
      extra: payload.extra,
    });
  } catch (error) {
    const details = getErrorMessage(error);
    console.error('[korea-customs-table] error:', details, error);
    return NextResponse.json(
      {
        error: 'Failed to load Korea customs data from Google Sheets',
        details,
      },
      { status: 503 }
    );
  }
}
