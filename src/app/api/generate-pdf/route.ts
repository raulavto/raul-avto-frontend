import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import puppeteerCore from 'puppeteer-core';

// Configure route for Node.js runtime (required for Puppeteer)
export const runtime = 'nodejs';
export const maxDuration = 60; // Allow up to 60 seconds for PDF generation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, language, carName, country } = body;
    const resolvedCountry =
      country === 'korea' || data?.country === 'korea' ? 'korea' : 'usa';

    console.log('Generate PDF - carName received:', carName, 'country:', resolvedCountry);

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

    // Prefer current host so local/Vercel deploys use their own template
    const host = request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (host ? `${proto}://${host}` : null) ||
      request.headers.get('origin') ||
      'https://www.raul-avto.com';

    const urlParams = new URLSearchParams({
      data: JSON.stringify(data),
      language: language,
      country: resolvedCountry,
    });
    if (carName) {
      urlParams.append('carName', carName);
    }

    const url = `${baseUrl}/api/pdf-template?${urlParams.toString()}`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Measure the template root only — viewport clientHeight (1123) was padding white under the footer
    const contentHeight = await page.evaluate(() => {
      const root =
        (document.querySelector('[data-pdf-root]') as HTMLElement | null) ||
        (document.body.firstElementChild as HTMLElement | null) ||
        document.body;
      const rect = root.getBoundingClientRect();
      return Math.ceil(Math.max(root.scrollHeight, root.offsetHeight, rect.height));
    });

    await page.setViewport({
      width: 792,
      height: Math.max(contentHeight, 1),
      deviceScaleFactor: 2,
    });

    // Use CSS px directly so page height matches the footer flush to the bottom
    const pdfBuffer = await page.pdf({
      width: '792px',
      height: `${contentHeight}px`,
      printBackground: true,
      preferCSSPageSize: false,
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
