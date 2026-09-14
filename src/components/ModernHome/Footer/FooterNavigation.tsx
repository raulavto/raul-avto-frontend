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

  const links = [
    { href: '/calculator', label: t.calculator },
    { href: '/terms', label: t.terms },
    { href: '/contacts', label: t.contacts },
    { href: '/about', label: t.about },
    { href: '/partnership', label: t.partnership },
    { href: '/blog', label: t.blog },
    { href: '/faq', label: t.faq },
  ];

  return (
    <nav className="">
      <ul className="flex flex-col gap-[12px]">
        {links.map((link, index) => (
          <li
            key={link.href}
            className={
              index === 0
                ? 'text-white text-[14px] tablet:text-[16px] font-medium'
                : 'text-primary text-[16px] font-medium'
            }
          >
            <Link
              className={`transition-colors duration-300 ease-in-out hover:text-red-600 focus:text-red-600 outline-none ${
                pathname === link.href ? isActiveClass : ''
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNavigation;
