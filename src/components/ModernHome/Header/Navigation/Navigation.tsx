'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useStore from '@/app/zustand/useStore';
import translations from '../../../../app/lang/navLinks.json';

const Navigation = () => {
  const pathname = usePathname();
  const language = useStore((state) => state.language);
  const isActiveClass = 'text-red-600 text-[16px]';
  const t = translations[language];
  return (
    <nav className="flex items-center">
      <Link href="/" className="focus:outline-focus outline-none mr-[70px]">
        <Image
          src="/modern-logo.png"
          alt="logo icon"
          width={185}
          height={90}
          className="mobile:w-[113px] mobile:h-[80px] tablet:w-[185px] tablet:h-[90px]"
        />
      </Link>
      <ul className="mobile:hidden pointnav:flex items-center gap-10">
        <li className="text-primary text-[16px] font-medium">
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

export default Navigation;
