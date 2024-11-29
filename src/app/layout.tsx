import Header from '@/components/ModernHome/Header/Header';
import Footer from '@/components/ModernHome/Footer/Footer';
import FormCall from '@/components/ModernHome/FormCall/FormCall';
import ButtonFeedback from '@/components/ModernHome/ButtonFeedback/ButtonFeedback';
import type { Metadata } from 'next';
import { myFontPanagram } from './fonts';
import './globals.css';
import '../components/Loader/loader.css';
import dynamic from 'next/dynamic';
const ReduxProvider = dynamic(() => import('../Providers/ReduxProvider'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Raul Auto',
  description: 'Car from USA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
