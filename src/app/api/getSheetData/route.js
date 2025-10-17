import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request) {
  // визначення ID таблиці в залежності від аукціону
  const auction = request.url.split('?auction=')[1] || 'copart';
  let spreadsheetId;

  try {
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
      /\\n/g,
      '\n'
    );

    switch (auction) {
      case 'iaai':
        spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_IAAI_ID;
        break;
      case 'copart':
      default:
        spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_COPART_ID;
        break;
    }

    if (!clientEmail || !privateKey || !spreadsheetId) {
      return NextResponse.json(
        {
          error:
            'Змінні оточення GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY або GOOGLE_SHEETS_SPREADSHEET_ID не знайдені.',
        },
        { status: 500 }
      );
    }

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

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання даних з Google Sheets:', error);
    return NextResponse.json(
      { error: 'Помилка отримання даних з Google Sheets.' },
      { status: 500 }
    );
  }
}
