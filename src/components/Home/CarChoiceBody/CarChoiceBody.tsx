"use client"

import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import lang from '../../../app/lang/carTypes.json';

const CarChoiceBody = () => {
  const language = useStore((state) => state.language);
  const carTypes = lang[language].carTypes;

  return (
    <div className="pb-[88px]">
      <h2 className="mobile:text-34 tablet:text-40 lg:text-56 desktop:text-[64px] font-bold text-center text-primary mobile:mt-10 mobile:mb-10 tablet:mb-20 flex justify-center">
        {language === 'ru' && 'Выбрать авто по кузову:'}
        {language === 'ua' && 'Вибрати авто за кузовом:'}
        {language === 'en' && 'Choose a car by body type:'}
      </h2>
      <ul className="flex gap-8 flex-wrap justify-center">
        {carTypes.map((car, index) => (
          <li
            key={index}
            className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 bg-gradient-sub-block py-[39px] px-[32px] w-[400px] h-[294px]"
          >
            <div className="flex justify-between items-center">
              <div className="mobile:text-30 tablet:text-34 font-bold text-primary">
                {car.name}
              </div>
              <div className="flex items-center justify-center min-w-[32px] h-[34px] rounded-sub-block-7 bg-input p-[10px] text-countCar text-20 font-semibold">
                {car.count}
              </div>
            </div>
            <Image
              src={car.imgSrc}
              alt={`${car.name} car`}
              width={400}
              height={226}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarChoiceBody;
