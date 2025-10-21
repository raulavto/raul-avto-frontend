import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import puppeteerCore from 'puppeteer-core';

// Configure route for Node.js runtime (required for Puppeteer)
export const runtime = 'nodejs';
export const maxDuration = 60; // Allow up to 60 seconds for PDF generation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, language } = body;

    // Determine if we're running on Vercel (serverless) vs local
    const isVercel = process.env.VERCEL === '1';

    let browser;

    if (isVercel) {
      // Vercel serverless: Use @sparticuz/chromium-min
      const executablePath = await chromium.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
      );

      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath,
        headless: true,
      });
    } else {
      // Local (dev or production build): Use puppeteer with bundled Chrome
      const puppeteer = await import('puppeteer');
      browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();

    // Set viewport to match your PDF template dimensions
    await page.setViewport({
      width: 792,
      height: 1123,
      deviceScaleFactor: 2, // Higher DPI for better quality
    });

    // Navigate to the PDF template route
    const baseUrl = 'https://www.raul-avto.com';

    const url = `${baseUrl}/api/pdf-template?data=${encodeURIComponent(
      JSON.stringify(data)
    )}&language=${language}`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get the actual content height
    const contentHeight = await page.evaluate(() => {
      const body = document.body;
      return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    });

    // Calculate page dimensions (792px width = 209.55mm)
    const pageWidth = 209.55; // mm
    const pageHeight = (contentHeight * 25.4) / 96; // Convert px to mm

    // Generate PDF with dynamic height
    const pdfBuffer = await page.pdf({
      width: `${pageWidth}mm`,
      height: `${pageHeight}mm`,
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(pdfBuffer as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="calculation-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
