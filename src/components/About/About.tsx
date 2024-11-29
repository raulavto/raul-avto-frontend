'use client';
import Image from 'next/image';
import useStore from '../../app/zustand/useStore'; // Путь к вашему Zustand store
import translations from '../../app/lang/aboutme.json'; // Путь к вашему JSON файлу с переводами
import FooterSocial from '../ModernHome/Footer/FooterSocial';

const About = () => {
  const language = useStore((state) => state.language); // Предположим, что вы храните язык в состоянии Zustand

  // Проверяем, что выбранный язык существует в translations
  if (!translations[language]) {
    throw new Error(`Translations for language "${language}" not found.`);
  }

  const {
    adminName,
    adminTitle,
    bio,
    contactPhone,
    telegramLink,
    contactLinks,
  } = translations[language];

  return (
    <div className="pt-[80px] pb-[96px] max-w-[1280px] mx-auto">
      <div className="tablet:flex tablet:space-x-2 mx-auto">
        <Image
          className="mx-auto"
          src="/raul-photo-for-faq.jpg"
          alt="admin photo"
          width={800}
          height={800}
        />
        <div className="tablet:w-3/5 mobile:mt-3 tablet:mt-0 mobile:mx-auto mobile:rounded-sub-block-10 tablet:rounded-2xl mobile:p-[32px] bg-mapbg">
          <h2 className="text-[40px] leading-[35px] mb-[20px] text-primary text-center font-bold">
            {adminName}
          </h2>
          <div className="font-medium text-[16px] text-secondary text-center mb-[22px] mx-auto">
            {adminTitle}
          </div>
          <div className="mx-auto space-y-2">
            {bio.map((paragraph, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg"
              >
                <p className="text-gray-200">{paragraph}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 mb-[25px] max-w-72 mx-auto mt-4">
            <a
              className="max-w-full h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 font-bold text-primary transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
              href={`tel:${contactPhone}`}
            >
              {contactPhone}
            </a>
            <a
              className="max-w-full h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-sub-block-10 bg-input text-16 font-bold text-primary transition duration-300 ease-in-out hover:scale-105 focus:outline-focus outline-none"
              href={contactLinks[0]}
            >
              {telegramLink}
            </a>
          </div>
          {/* <ul className="flex gap-4 mobile:items-center mobile:justify-center">
            <li>
              <a
                className="focus:outline-focus outline-none"
                href={contactLinks[0]}
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
                href={contactLinks[1]}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:scale-110 duration-300"
                  src="/massages.png"
                  alt="icon messenger"
                  width={56}
                  height={56}
                />
              </a>
            </li>
            <li>
              <a
                className="focus:outline-focus outline-none"
                href={contactLinks[2]}
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
                href={contactLinks[3]}
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

export default About;
