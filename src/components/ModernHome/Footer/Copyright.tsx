'use client';
import Link from 'next/link';

import useStore from '@/app/zustand/useStore';

import translations from '../../../app/lang/footerTranslations.json';

export default function Copyright() {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <p className="text-[14px] font-medium leading-[1.17] text-white text-center mt-8 pointuserbar:text-start">
      {t.copyright} -{' '}
      <Link
        href="https://www.cyanidium.dev/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-red-600 transition-default"
      >
        cyanidium.dev
      </Link>
    </p>
  );
}
