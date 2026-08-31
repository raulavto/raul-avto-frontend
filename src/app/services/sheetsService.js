import { google } from 'googleapis';

const READONLY_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets.readonly',
];
const WRITE_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function normalizePrivateKey(rawKey) {
  let key = String(rawKey).trim();

  // Якщо в Vercel/env скопіювали значення разом із лапками з .env.local
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Один рядок з \n → справжні переноси
  key = key.replace(/\\n/g, '\n');

  return key.trim();
}

function getSheetsClient(readonly = false) {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error(
      'GOOGLE_SHEETS_CLIENT_EMAIL або GOOGLE_SHEETS_PRIVATE_KEY не налаштовані'
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: normalizePrivateKey(privateKey),
    scopes: readonly ? READONLY_SCOPES : WRITE_SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

export async function getSheetValues(spreadsheetId, range) {
  const sheets = getSheetsClient(true);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values || [];
}

export async function getSpreadsheetSheetTitles(spreadsheetId) {
  const sheets = getSheetsClient(true);
  const response = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });
  return (response.data.sheets || [])
    .map((sheet) => sheet.properties?.title)
    .filter(Boolean);
}

export async function addRowToSheet(spreadsheetId, data) {
  try {
    const sheets = getSheetsClient(false);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:A',
    });

    const rowCount = response.data.values ? response.data.values.length + 1 : 2;

    const values = [
      [data.name, data.phone, new Date().toLocaleString('uk-UA')],
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
