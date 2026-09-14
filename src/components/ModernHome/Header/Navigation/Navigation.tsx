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

  const isLeadForm =
    pathname === '/lead-form' || pathname === '/lead-form-thanks';

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
    <nav className="flex items-center">
      <Link
        href={`${!isLeadForm ? '/' : '#'}`}
        className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus mr-[70px]"
      >
        <Image
          src="/modern-logo.png"
          alt="logo icon"
          width={185}
          height={90}
          className="mobile:w-[113px] mobile:h-[80px] tablet:w-[185px] tablet:h-[90px]"
        />
      </Link>
      {!isLeadForm && (
        <ul className="mobile:hidden pointnav:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.href} className="text-primary text-[16px] font-medium">
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
      )}
    </nav>
  );
};

export default Navigation;
