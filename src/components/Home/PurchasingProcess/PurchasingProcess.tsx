"use client"
import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/purchasingStepsTranslations.json';

const PurchasingProcess = () => {
  const language = useStore(state => state.language) || 'ru'; // Default language fallback
  const { title, steps } = translations[language] || {};

  const purchasingSteps = [
    {
      imgSrc: '/callicon.png',
      imgAlt: 'callicon',
    },
    {
      imgSrc: '/treaty.png',
      imgAlt: 'treaty',
    },
    {
      imgSrc: '/search.png',
      imgAlt: 'search',
    },
    {
      imgSrc: '/auction.png',
      imgAlt: 'auction',
    },
    {
      imgSrc: '/payment.png',
      imgAlt: 'payment',
    },
    {
      imgSrc: '/delivery.png',
      imgAlt: 'delivery',
    },
    {
      imgSrc: '/icon-stars.png',
      imgAlt: 'icon-stars',
    },
    {
      imgSrc: '/icon-key.png',
      imgAlt: 'icon-key',
    },
  ];


  return (
    <div className="mobile:pb-[104px] desktop:pb-[204px]">
      <h2 className="mobile:text-34 tablet:text-40 lg:text-56 desktop:text-[64px] font-bold text-center text-primary flex justify-center mobile:mb-10 tablet:mb-[96px]">
        {title}
      </h2>
      <ul className="flex items-center justify-center flex-wrap gap-[32px]">
        {steps.map((step, index) => (
          <li
            className="w-[420px] mobile:h-auto desktop:h-[420px] bg-gradient-sub-block p-[32px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-32"
            key={index}
          >
            <div className="flex items-center mb-[40px]">
              <Image
                className="mr-[78px]"
                src={purchasingSteps[index].imgSrc}
                alt={purchasingSteps[index].imgAlt}
                width={160}
                height={160}
              />
              <div className="text-[100px] font-extrabold bg-gradient-count bg-clip-text text-transparent">
                {index + 1}
              </div>
            </div>
            <div className="text-[28px] font-bold leading-[48px] text-primary mb-[10px]">
              {step.title}
            </div>
            <p className="w-full text-[16px] font-medium text-countCar">
              {step.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchasingProcess;
