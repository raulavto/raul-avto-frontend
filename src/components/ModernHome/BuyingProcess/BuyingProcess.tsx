'use client';
import Container from '@/components/Container/Container';
import AnimatedStep from '@/components/ModernHome/AnimatedStep';
import Image from 'next/image';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/buyingProcess.json';

const buyingSteps = [
  {
    number: 1,
    key: 'order', // добавьте ключ для каждого шага
  },
  {
    number: 2,
    key: 'agreement',
  },
  {
    number: 3,
    key: 'vehicle_search',
  },
  {
    number: 4,
    key: 'auction',
  },
  {
    number: 5,
    key: 'payment',
  },
  {
    number: 6,
    key: 'delivery',
  },
  {
    number: 7,
    key: 'repair',
  },
  {
    number: 8,
    key: 'customs_clearance',
  },
  {
    number: 9,
    key: 'car_transfer',
  },
];

const BuyingProcess = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  return (
    <section className="py-[112px] bg-black text-white">
      <Container>
        <h2 className="uppercase text-center text-[28px] pointuserbar:text-[48px] font-bold mx-auto mb-12 pointuserbar:mb-[86px] max-w-[300px] pointuserbar:max-w-full">
          {t.section_title}
        </h2>
        <ul className="relative flex flex-col justify-center gap-8 lg:gap-x-[53px] lg:gap-y-[66px] sm:flex-row sm:flex-wrap">
          {buyingSteps.map((step, index) => (
            <AnimatedStep
              key={step.number}
              number={step.number}
              title={t.steps[index].title} // Используем перевод для title
              description={t.steps[index].description} // Используем перевод для description
              index={index}
            />
          ))}
          <li className="mobile:hidden lg:block lg:absolute top-[-5%] left-[17%]">
            <Image
              src="/GroupDecor.png"
              alt="decor icon"
              width={400}
              height={600}
              className="w-[860px] h-auto"
            />
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default BuyingProcess;
