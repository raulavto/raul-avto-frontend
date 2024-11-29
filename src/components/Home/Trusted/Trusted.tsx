'use client';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const Trusted = () => {
  const trustedBrands = [
    {
      src: '/mercedes.png',
      alt: 'mercedes-benz logo',
      width: 350,
      height: 39,
    },
    { src: '/logo_kia_black.png', alt: 'kia logo', width: 158, height: 39 },
    { src: '/tesla.png', alt: 'tesla logo', width: 350, height: 39 },
  ];

  return (
    <div className="mobile:pb-[125px] desktop:pb-[225px] max-w-[1696px] mx-auto">
      <h3 className="flex justify-center text-primary mobile:text-34 tablet:text-40 font-bold mobile:mb-[60px] tablet:mb-[90px]">
        Нам доверяют:
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
    </div>
  );
};

export default Trusted;
