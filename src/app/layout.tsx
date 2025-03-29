import Header from '@/components/ModernHome/Header/Header';
import Footer from '@/components/ModernHome/Footer/Footer';
import FormCall from '@/components/ModernHome/FormCall/FormCall';
import ButtonFeedback from '@/components/ModernHome/ButtonFeedback/ButtonFeedback';
import type { Metadata, Viewport } from 'next';
import { myFontPanagram } from './fonts';
import './globals.css';
import '../components/Loader/loader.css';
import dynamic from 'next/dynamic';
import { GoogleTagManager } from '@next/third-parties/google';
import { Suspense } from 'react';
import { FacebookPixelEvents } from './utils/analytics';

const ReduxProvider = dynamic(() => import('../Providers/ReduxProvider'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Raul Auto',
  description: 'Car from USA',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <GoogleTagManager gtmId="GTM-MM6J6JCP" />
        <Suspense fallback={null}>
          <FacebookPixelEvents />
        </Suspense>
      </head>
      <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      <link rel="manifest" href="/manifest.json"></link>
      <body className={myFontPanagram.className}>
        <ReduxProvider>
          <Header />
          <main className="mt-[100px]">{children}</main>
          <ButtonFeedback />
          <FormCall />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
