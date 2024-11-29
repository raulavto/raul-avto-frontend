import type { Config } from 'tailwindcss';

const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '320px',
        mobileplus: '480px',
        tablet: '768px',
        tabletplus: '880px',
        pointuserbar: '960px',
        mac: '1280px',
        desktop: '1285px',
        pointnav: '1340px',
        fullhd: '1920px',
      },
      textColor: {
        primary: '#ebebeb',
        secondary: '#6a6969',
        tertiary: '#04121B7A',
        countCar: '#8c8c8c',
        placeholderText: '#4e5156',
        hoverprimary: '#ffffff',
        responsive: '4vw',
        dynamicblock: '#060606',
      },
      backgroundImage: {
        'gradient-input': 'linear-gradient(83deg, #333333 2.3%, #0f0f0f 70%)',
        'gradient-contact-btn':
          'linear-gradient(90deg, #b9000b 0%, #ea001c 100%), #272a2e',
        'gradient-sub-block':
          'linear-gradient(270deg, #141516 0%, #121213 100%);',
        'gradient-red': 'linear-gradient(90deg, #b9000b 0%, #ea001c 100%)',
        'gradient-red-hover':
          'linear-gradient(90deg, #a8000a 0%, #d9001a 100%)',
        'gradient-count':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
        'gradient-hero':
          ' linear-gradient(181deg, #060606 0%, rgba(6, 6, 6, 0) 100%), linear-gradient(90deg, #060606 9.23%, rgba(6, 6, 6, 0) 94.65%), linear-gradient(180deg, rgba(6, 6, 6, 0) 82.29%, #060606 100%);',
        'gradient-advantages':
          'linear-gradient(270deg, #1b1b1c 0%, #171718 100%)',
        'gradient-white': 'linear-gradient(90deg, #ececec 0%, #c7c7c7 100%)',
        'gradient-select': 'linear-gradient(270deg, #141516 0%, #121213 100%)',
      },
      backgroundColor: {
        fon: '#000000',
        balancegreen: '#108731',
        paid: '#a89916',
        arrived: '#117c9e',
        decor: '#292b2e',
        input: '#272a2e',
        copybtn: '#3b3e41',
        mapbg: '#121314',
        primary: '#3e4146',
        orderssubblock: '#1e2023',
      },
      borderColor: {
        primary: '#3e4146',
        focus: '#ff3e00',
      },
      borderRadius: {
        'sub-block-6': '6px',
        'sub-block-7': '7px',
        'sub-block-8': '8px',
        'sub-block-10': '10px',
        'sub-block-11': '11px',
        'sub-block-12': '12px',
        'sub-block-14': '14px',
        'sub-block-16': '16px',
        'sub-block-22': '22px',
        'sub-block-24': '24px',
        'sub-block-26': '26px',
        'sub-block-32': '32px',
        'sub-block-36': '36px',
        'sub-block-42': '42px',
      },
      fontSize: {
        '8': ['8px', '24px'],
        '12': ['12px', '16px'],
        '14': ['14px', '16px'],
        '16': ['16px', '48px'],
        '17': ['17px', '24px'],
        '18': ['18px', '24px'],
        '20': ['20px', '48px'],
        '23': ['23px', '32'],
        '24': ['24px', '32px'],
        '28': ['28px', '39px'],
        '30': ['30px', '48px'],
        '32': ['32px', '80px'],
        '34': ['34px', '48px'],
        '40': ['40px', '48px'],
        '56': ['56px', '72px'],
        '64': ['64px', '80px'],
        '106': ['106px', '48px'],
        '128': ['128px', '88px'],
      },
      transitionDuration: {
        '0': '0ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'ease-in': 'ease-in',
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
        linear: 'linear',
      },
      colors: {
        focus: '#ff3e00',
        error: '#EB5757',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
