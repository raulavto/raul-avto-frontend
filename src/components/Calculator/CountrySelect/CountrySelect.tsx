'use client';

import { useState } from 'react';
import Image from 'next/image';
import useStore from '@/app/zustand/useStore';
import translations from '@/app/lang/countrySelect.json';

export type CalculatorCountry = 'usa' | 'korea';

type CountrySelectProps = {
  value: CalculatorCountry | null;
  onChange: (country: CalculatorCountry) => void;
};

const countries: {
  id: CalculatorCountry;
  image: string;
  labelKey: 'usa' | 'korea';
}[] = [
  { id: 'usa', image: '/flags/usa.png', labelKey: 'usa' },
  { id: 'korea', image: '/flags/korea.png', labelKey: 'korea' },
];

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const language = useStore((state) => state.language);
  const t = translations[language] || translations.ua;
  const [hovered, setHovered] = useState<CalculatorCountry | null>(null);

  return (
    <div className="w-full max-w-[1696px] mx-auto px-0 mobile:mb-[16px] tablet:mb-[24px] desktop:mb-[32px]">
      <p className="text-secondary text-16 tablet:text-18 font-semibold mb-[12px] tablet:mb-[16px] text-center">
        {t.title}
      </p>
      <div className="grid grid-cols-2 gap-[8px] tablet:gap-[12px] overflow-hidden rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42">
        {countries.map((country) => {
          const isSelected = value === country.id;
          const isHovered = hovered === country.id;
          const showLabel = isHovered || isSelected;

          return (
            <button
              key={country.id}
              type="button"
              onClick={() => onChange(country.id)}
              onMouseEnter={() => setHovered(country.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative h-[140px] tablet:h-[200px] desktop:h-[260px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-pressed={isSelected}
            >
              <Image
                src={country.image}
                alt={t[country.labelKey]}
                fill
                sizes="50vw"
                className={`object-cover transition duration-500 ease-out ${
                  isSelected
                    ? 'scale-105 brightness-[0.85]'
                    : 'scale-100 brightness-[0.45] group-hover:brightness-[0.7] group-hover:scale-[1.03]'
                }`}
                priority
              />

              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                  showLabel ? 'opacity-100' : 'opacity-60'
                }`}
              />

              <span
                className={`pointer-events-none absolute inset-x-0 bottom-[18px] tablet:bottom-[28px] flex justify-center transition-all duration-500 ease-out ${
                  showLabel
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <span className="text-primary font-bold text-24 tablet:text-32 desktop:text-40 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
                  {t[country.labelKey]}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CountrySelect;
