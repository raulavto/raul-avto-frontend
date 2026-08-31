'use client';
import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/departmentContacts.json';

const DepartmentContacts = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  const toTelHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
  const toTelegramHref = (handle: string) =>
    `https://t.me/${handle.replace('@', '')}`;

  return (
    <div className="pb-[104px]">
      <div className="flex flex-col gap-[32px]">
        <div className="mx-auto flex flex-wrap justify-center items-center gap-[32px]">
          <div className="mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center tablet:text-left tablet:flex-row desktop:w-[769px] p-[32px] flex gap-[32px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-mapbg">
            <Image
              className="rounded-sub-block-22"
              src="/selection-auto.png"
              alt="selection-auto icon"
              width={120}
              height={120}
            />
            <div className="flex flex-col gap-[32px]">
              <div className="text-[29px] text-primary font-bold">
                {t.selection_title}
              </div>
              <div className="mobile:flex mobile:gap-4 mobile:flex-col mobile:items-center mobile:justify-center tablet:flex-row tablet:items-start tablet:justify-start">
                <a
                  className="w-[270px] h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 text-primary font-bold transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
                  href={toTelHref(t.selection_phone)}
                >
                  {t.selection_phone}
                </a>
                <a
                  className="w-[270px] h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 text-primary font-bold transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
                  href={toTelegramHref(t.telegram_selection)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.telegram_selection}
                </a>
              </div>
            </div>
          </div>
          <div className="mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center tablet:text-left tablet:flex-row desktop:w-[769px] p-[32px] flex gap-[32px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-mapbg">
            <Image
              className="rounded-sub-block-22"
              src="/repair.png"
              alt="repair icon"
              width={120}
              height={120}
            />
            <div className="flex flex-col gap-[32px]">
              <div className="text-[29px] text-primary font-bold">
                {t.parts_title}
              </div>
              <div className="mobile:flex mobile:gap-4 mobile:flex-col mobile:items-center mobile:justify-center tablet:flex-row tablet:items-start tablet:justify-start">
                <a
                  className="w-[270px] h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 text-primary font-bold transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
                  href={toTelHref(t.parts_phone)}
                >
                  {t.parts_phone}
                </a>
                <a
                  className="w-[270px] h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 text-primary font-bold transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
                  href={toTelegramHref(t.telegram_parts)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.telegram_parts}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div className="mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center tablet:text-left tablet:flex-row desktop:w-[769px] p-[32px] flex gap-[32px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-mapbg">
            <Image
              className="rounded-sub-block-22"
              src="/dilivert-auto.png"
              alt="dilivert-auto icon"
              width={120}
              height={120}
            />
            <div className="flex flex-col gap-[32px]">
              <div className="text-[29px] text-primary font-bold">
                {t.logistics_title}
              </div>
              <div className="mobile:flex mobile:gap-4 mobile:flex-col mobile:items-center mobile:justify-center tablet:flex-row tablet:items-start tablet:justify-start">
                <a
                  className="w-[270px] h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 text-primary font-bold transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
                  href={toTelHref(t.logistics_phone)}
                >
                  {t.logistics_phone}
                </a>
                <a
                  className="w-[270px] h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 text-primary font-bold transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
                  href={toTelegramHref(t.telegram_logistics)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.telegram_logistics}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentContacts;
