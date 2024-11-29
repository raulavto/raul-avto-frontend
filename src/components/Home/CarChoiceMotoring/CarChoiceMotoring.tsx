"use client";
import React from 'react';
import useStore from '../../../app/zustand/useStore';
import engineTypes from '../../../app/lang/engineTypes.json';

interface EngineType {
  name: string;
  count: number;
}

const CarChoiceMotoring = () => {
  const language = useStore((state) => state.language);
  const { title, types }: { title: string; types: EngineType[] } = engineTypes[language];

  return (
    <div className="mobile:pb-[80px] tablet:pb-[160px]">
      <h2 className="mobile:text-34 tablet:text-40 lg:text-56 desktop:text-[64px] font-bold mobile:mb-10 tablet:mb-[80px] text-primary text-center flex justify-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 tablet:grid-cols-2 2xl:grid-cols-4 gap-8">
        {types.map((engine, index) => (
          <div
            key={index}
            className="mx-auto w-[350px] h-[130px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 flex justify-between items-center p-8 bg-gradient-sub-block"
          >
            <div className="mobile:text-28 tablet:text-34 font-bold text-primary">
              {engine.name}
            </div>
            <div className="flex items-center justify-center rounded-sub-block-7 bg-input p-[10px] text-countCar text-20 font-semibold min-w-[34px] h-[32px]">
              {engine.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarChoiceMotoring;
