'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/footerNavigation.json';

const FooterNavigation = () => {
  const pathname = usePathname();
  const language = useStore((state) => state.language);
  const t = translations[language];
  const isActiveClass = 'text-red-600 text-14';
  return (
    <nav className="">
      <ul className="flex flex-col gap-[12px]">
        <li className="text-white text-[14px] tablet:text-[16px] font-medium">
          <Link
            className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
              pathname === '/calculator' ? isActiveClass : ''
            }`}
            href="/calculator"
          >
            {t.calculator}
          </Link>
        </li>
        <li className="text-primary text-[16px] font-medium">
          <Link
            className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
              pathname === '/partnership' ? isActiveClass : ''
            }`}
            href="/partnership"
          >
            {t.partnership}
          </Link>
        </li>
        <li className="text-primary text-[16px] font-medium">
          <Link
            className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
              pathname === '/contacts' ? isActiveClass : ''
            }`}
            href="/contacts"
          >
            {t.contacts}
          </Link>
        </li>
        <li className="text-primary text-[16px] font-medium">
          <Link
            className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
              pathname === '/about' ? isActiveClass : ''
            }`}
            href="/about"
          >
            {t.about}
          </Link>
        </li>
        <li className="text-primary text-[16px] font-medium">
          <Link
            className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
              pathname === '/blog' ? isActiveClass : ''
            }`}
            href="/blog"
          >
            {t.blog}
          </Link>
        </li>
        <li className="text-primary text-[16px] font-medium">
          <Link
            className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
              pathname === '/faq' ? isActiveClass : ''
            }`}
            href="/faq"
          >
            {t.faq}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNavigation;
