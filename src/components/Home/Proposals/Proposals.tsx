'use client'
import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/proposalsTranslations.json';

const Proposals = () => {
  const language = useStore(state => state.language) || 'ru'; // Default language fallback
  const { title, description, buttonText } = translations[language] || {};

  return (
    <div className="mobile:pb-[100px] desktop:pb-[200px]">
      <div className="relative flex flex-col ml-auto mr-auto gap-10 max-w-[1688px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-42 bg-gradient-sub-block mobile:p-[20px] mobile:items-center mobile:justify-center desktop:items-start desktop:justify-start desktop:p-[30px] fullhd:p-[80px]">
        <div className="mobile:text-center desktop:text-left mobile:text-34 mobile:max-w-[320px] desktop:text-64 font-bold text-primary desktop:max-w-[955px]">
          {title.split(' ').map((word, index) => (
            <span key={index} className={index === 1 ? "desktop:block fullhd:inline-block" : ""}>
              {word}{' '}
            </span>
          ))}
        </div>
        <p className="mobile:text-center desktop:text-left font-[500] mobile:text-[22px] lg:text-[20px] fullhd:text-24 text-secondary max-w-[780px]">
          {description.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </p>
        <a
          className="flex items-center justify-center bg-gradient-red text-primary text-18 w-[315px] h-[60px] rounded-sub-block-12 gap-2 transform transition duration-300 ease-in-out hover:scale-105 hover:text-hoverprimary focus:outline-focus outline-none"
          href="/"
        >
          <span>{buttonText}</span>
          <Image
            src="/telegram-icon-btn.png"
            alt="telegram icon"
            width={24}
            height={24}
          />
        </a>
        <Image
          className="absolute mobile:hidden desktop:block right-0 bottom-0"
          src="/dailydeals.png"
          alt="mobile img"
          width={579}
          height={853}
        />
      </div>
    </div>
  );
};

export default Proposals;
