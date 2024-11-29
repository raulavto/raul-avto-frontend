'use client';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/trusted.json';

const trustedBrands = [
  {
    src: '/mercedes.png',
    alt: 'mercedes-benz logo',
    width: 350,
    height: 39,
  },
  { src: '/logo_kia_black.png', alt: 'kia logo', width: 158, height: 39 },
  { src: '/tesla.png', alt: 'tesla logo', width: 350, height: 39 },
  { src: '/Ford-Logo.png', alt: 'ford logo', width: 198, height: 77 },
  { src: '/bmw-logo.png', alt: 'bmw logo', width: 229, height: 68 },
];
const Trusted = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <section className="py-[112px] pointuserbar:py-[200px]">
      <h3 className="uppercase text-center text-white text-[28px] pointuserbar:text-[44px] font-bold mb-[42px] pointuserbar:mb-[86px]">
        {t.trusted_title}
      </h3>
      <Marquee
        speed={50}
        gradient={true}
        gradientColor={'black'}
        gradientWidth={60}
        pauseOnHover={true}
        autoFill={true}
      >
        <ul className="flex gap-28 flex-wrap justify-center items-center mr-[112px]">
          {trustedBrands.map((brand, index) => (
            <li key={index}>
              <Image
                src={brand.src}
                alt={brand.alt}
                width={brand.width}
                height={brand.height}
              />
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
};

export default Trusted;
