import localFont from 'next/font/local';

export const myFontPanagram = localFont({
  src: [
    {
      path: './fonts/Pangram-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Pangram-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pangram-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Pangram-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Pangram-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Pangram-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pangram-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
});
