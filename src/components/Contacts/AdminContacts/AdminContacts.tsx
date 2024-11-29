'use client';
import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/contacts.json';
import FooterSocial from '@/components/ModernHome/Footer/FooterSocial';

const AdminContacts = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <div className="pt-[80px] pb-[96px]">
      <div className="relative max-w-[496px] mx-auto">
        <Image
          className="mx-auto"
          src="/admin-photo.png"
          alt="admin photo"
          width={496}
          height={643}
        />
        <div className="tablet:absolute mobile:mt-3 tablet:mt-0 mobile:mx-auto mobile:max-w-[496px] desktop:h-[351px] tablet:left-[270px] tablet:top-[320px] desktop:left-[408px] desktop:top-[136px] tablet:w-[339px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 mobile:p-[32px] bg-mapbg">
          <h2 className="text-[30px] leading-[35px] mb-[20px] text-primary text-center font-bold">
            {t.title}
          </h2>
          <div className="font-medium text-[16px] text-secondary text-center mb-[22px] mx-auto">
            {t.subtitle}
          </div>
          <div className="flex flex-col gap-4 mb-[25px]">
            <a
              className="max-w-full h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 font-bold text-primary transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
              href={`tel:${t.phone}`}
            >
              {t.phone}
            </a>
            <a
              className="max-w-full h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 font-bold text-primary transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
              href={`https://t.me/${t.telegram}`}
            >
              {t.telegram}
            </a>
          </div>
          {/* <ul className="flex gap-4 mobile:items-center mobile:justify-center">
            <li>
              <a
                className="focus:outline-focus outline-none "
                href={`https://t.me/RAUL_AVTO`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:scale-110 duration-300"
                  src="/telegram.png"
                  alt="icon telegram"
                  width={56}
                  height={56}
                />
              </a>
            </li>
            <li>
              <a
                className="focus:outline-focus outline-none"
                href="https://www.facebook.com/raulautoUSA/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:scale-110 duration-300"
                  src="/massages.png"
                  alt="icon messanger"
                  width={56}
                  height={56}
                />
              </a>
            </li>
            <li>
              <a
                className="focus:outline-focus outline-none"
                href={`https://wa.me/+380737727373`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:scale-110 duration-300"
                  src="/WhatsApp.png"
                  alt="icon whatsapp"
                  width={56}
                  height={56}
                />
              </a>
            </li>
            <li>
              <a
                className="focus:outline-focus outline-none"
                href={`https://viber.com/+380737727373`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:scale-110 duration-300"
                  src="/viber.png"
                  alt="icon viber"
                  width={56}
                  height={56}
                />
              </a>
            </li>
          </ul> */}
          <FooterSocial />
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
