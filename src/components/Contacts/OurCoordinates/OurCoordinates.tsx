'use client';
import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/ourCoordinates.json';

const OurCoordinates = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <div className="mobile:pt-[30px] tablet:pt-[40px] desktop:pt-[64px]">
      <div className="max-w-[1696px] mx-auto p-3">
        <h1 className="text-primary mobile:text-40 tablet:text-56 desktop:text-64 font-bold mobile:mb-[33px] desktop:mb-[63px]">
          {t.title}
        </h1>
      </div>
      <div className="max-w-[1696px] bg-mapbg mobile:rounded-sub-block-10 tablet:rounded-sub-block-36 desktop:rounded-sub-block-42 mobile:p-0 tablet:p-[25px] desktop:p-[32px] mx-auto overflow-hidden">
        <div className="relative w-full pb-[36.04%] mb-[32px]">
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/modern-big-map.png"
            alt="map img"
            fill
          />
        </div>
        <div className="h-[1px] bg-[#8c8c8c] opacity-[0.1] w-full mb-[32px]"></div>
        <ul className="flex flex-wrap items-center mobile:justify-around desktop:justify-center mobile:gap-[25px] tablet:gap-[40px] desktop:gap-[64px]">
          {t.locations.map((location, index) => (
            <li key={index} className="flex flex-col">
              <div className="text-primary mobile:text-20 tablet:text-30 font-bold">
                {location.city}
              </div>
              <div className="mobile:text-14 mobile:leading-10 tablet:text-16 text-secondary font-medium">
                {location.address}
              </div>
              <div className="mobile:text-14 mobile:leading-10 tablet:text-16 text-secondary font-medium">
                {location.hours}
              </div>
              <div className="mobile:text-14 mobile:leading-10 tablet:text-16 font-bold text-primary">
                <a
                  href={`tel:${location.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 duration-300"
                >
                  {location.phone}
                </a>
              </div>
              <div className="mobile:text-14 mobile:leading-10 tablet:text-16 font-bold text-primary">
                <a
                  href={`mailto:${location.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 duration-300"
                >
                  {location.email}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OurCoordinates;
