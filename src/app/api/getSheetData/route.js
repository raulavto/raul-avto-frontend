import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getMockSheetRows } from './mockAuctionData';

async function loadLocalAuctionRows(auction) {
  const fileName =
    String(auction).toLowerCase() === 'iaai' ? 'iaai.json' : 'copart.json';
  const filePath = path.join(process.cwd(), 'src/app/api/getSheetData/data', fileName);

  try {
    const raw = await readFile(filePath, 'utf8');
    const rows = JSON.parse(raw);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows;
    }
  } catch {
    // file missing or invalid — fall through
  }

  return null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const auction = (searchParams.get('auction') || 'copart').toLowerCase();
  let spreadsheetId;

  try {
    // 1) Prefer local JSON (exported from Excel)
    const localRows = await loadLocalAuctionRows(auction);
    if (localRows) {
      return NextResponse.json(
        { data: localRows, source: 'local' },
        { status: 200 }
      );
    }

    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
      /\\n/g,
      '\n'
    );
    const useMock =
      process.env.USE_MOCK_AUCTION_DATA === 'true' ||
      !clientEmail ||
      !privateKey;

    switch (auction) {
      case 'iaai':
        spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_IAAI_ID;
        break;
      case 'copart':
      default:
        spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_COPART_ID;
        break;
    }

    // 2) Small mock fallback when no local file and no Google credentials
    if (useMock || !spreadsheetId) {
      console.warn(
        `[getSheetData] Using mock auction locations for "${auction}".`
      );
      return NextResponse.json(
        { data: getMockSheetRows(auction), source: 'mock' },
        { status: 200 }
      );
    }

    // 3) Google Sheets (production)
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Table1!A1:H300',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: 'Дані не знайдено.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: rows, source: 'google' }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання даних аукціонів:', error);
    return NextResponse.json(
      { error: 'Помилка отримання даних аукціонів.' },
      { status: 500 }
    );
  }
}
