import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.JWT(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  SCOPES
);

const sheets = google.sheets({ version: 'v4', auth });

export async function addRowToSheet(spreadsheetId, data) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:A',
    });

    const rowCount = response.data.values ? response.data.values.length + 1 : 2;

    const values = [
      [
        data.name,
        data.instagram,
        data.phone,
        new Date().toLocaleString('uk-UA'),
      ],
    ];

    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `B${rowCount}`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log('✅ Дані успішно додані:', appendResponse.data);
    return appendResponse.data;
  } catch (error) {
    console.error('❌ Помилка при додаванні рядка:', error);
    throw error;
  }
}
