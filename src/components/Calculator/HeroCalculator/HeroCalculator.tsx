'use client';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calcHero.json';

const HeroCalculator = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <div className="mobile:pt-[30px] tablet:pt-[40px] desktop:pt-[65px] fullhd:pt-[88px] mx-auto max-w-[1557px] mobile:h-[200px] tablet:h-[250px] desktop:h-[369px] mobile:bg-[url('/calculator-fon.png')] mobile:bg-no-repeat mobile:bg-right mobile:bg-contain tablet:bg-right desktop:bg-right desktop:bg-auto">
      <h1 className=" text-primary font-bold max-w-[822px] mobile:text-24 pt-20 tablet:pt-0 mobile:text-center sm:text-left tablet:text-[30px] tablet:leading-[50px] desktop:text-[50px] desktop:leading-[72px] fullhd:text-40">
        <span className="block">{t.hero_title_line1}</span>
        <span className="block">{t.hero_title_line2}</span>
        <span className="block">{t.hero_title_line3}</span>
      </h1>
    </div>
  );
};

export default HeroCalculator;
