import { NextRequest, NextResponse } from 'next/server';
import { renderPDFTemplateToString } from '../../../components/PDFTemplate/PDFTemplate';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const data = JSON.parse(searchParams.get('data') || '{}');
    const language = searchParams.get('language') || 'en';

    // Use the server-side function to render the PDFTemplate
    const htmlContent = await renderPDFTemplateToString({ data, language });

    // Create a complete HTML document with Tailwind CSS
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>PDF Document</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;900&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    return new NextResponse(fullHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error rendering PDF template:', error);
    return NextResponse.json(
      { error: 'Failed to render PDF template' },
      { status: 500 }
    );
  }
}
