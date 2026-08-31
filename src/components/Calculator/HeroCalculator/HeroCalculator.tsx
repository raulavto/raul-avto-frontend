'use client';

import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calcHero.json';
import type { CalculatorCountry } from '../CountrySelect/CountrySelect';

type HeroCalculatorProps = {
  country?: CalculatorCountry | null;
};

const HeroCalculator = ({ country = null }: HeroCalculatorProps) => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  const line3Key = country ?? 'none';
  const line3 = t.hero_title_line3[line3Key] || t.hero_title_line3.none;

  return (
    <div className="mobile:pt-[30px] tablet:pt-[40px] desktop:pt-[65px] fullhd:pt-[88px] mx-auto max-w-[1557px] mobile:h-[200px] tablet:h-[250px] desktop:h-[369px] mobile:bg-[url('/calculator-fon.png')] mobile:bg-no-repeat mobile:bg-right mobile:bg-contain tablet:bg-right desktop:bg-right desktop:bg-auto">
      <h1 className=" text-primary font-bold max-w-[822px] mobile:text-24 pt-20 tablet:pt-0 mobile:text-center sm:text-left tablet:text-[30px] tablet:leading-[50px] desktop:text-[50px] desktop:leading-[72px] fullhd:text-40">
        <span className="block">{t.hero_title_line1}</span>
        <span className="block">{t.hero_title_line2}</span>
        <span
          key={line3Key}
          className="hero-line-in block"
        >
          {line3}
        </span>
      </h1>
      <style jsx>{`
        .hero-line-in {
          animation: heroLineIn 0.4s ease-out;
        }
        @keyframes heroLineIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCalculator;
