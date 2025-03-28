import { addRowToSheet } from '../../services/sheetsService';

export async function POST(req) {
  try {
    const body = await req.json();

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_COMPETITION_ID;

    if (!spreadsheetId) {
      return new Response(JSON.stringify({ error: 'Не знайдено ID таблиці' }), {
        status: 500,
      });
    }

    const result = await addRowToSheet(spreadsheetId, body);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Не вдалося додати рядок' }), {
      status: 500,
    });
  }
}
