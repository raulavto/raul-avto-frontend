import PrizeItem from './PrizeItem';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion } from 'framer-motion';
import { listVariants } from '@/app/utils/animation';

export default function PrizesList() {
  const prizesList = [
    {
      number: '#1',
      image: 'car',
      title: 'Audi A8 2014 Long 4.0 TFSI V8 (Stage 1)',
      description:
        'Твоя мрія — Audi A8 2014 Long 4.0 TFSI V8! Розкіш та потужність у кожному русі!',
    },
    {
      number: '#2',
      image: 'phone',
      title: 'iPhone 16',
      description: 'Виграй новий iPhone 16 — стиль та інновації в твоїх руках!',
    },
    {
      number: '#3',
      image: 'money',
      title: '10 000 Гривень',
      description: '10 000 грн чекають на тебе! Не втрать шанс виграти!',
    },
  ];

  return (
    <AnimatedWrapper
      as={motion.ul}
      viewport={{ once: true, amount: 0.3 }}
      animation={listVariants({ staggerChildren: 0.5, delayChildren: 0.4 })}
      className="flex flex-col pointuserbar:flex-row pointuserbar:justify-between pointuserbar:items-center gap-y-10 
    pointuserbar:gap-x-8 mac:gap-x-12 max-w-[430px] pointuserbar:max-w-[1215px] mx-auto text-white"
    >
      {prizesList.map((prize, idx) => (
        <PrizeItem
          key={idx}
          prize={prize}
          className={`${
            idx === 0
              ? 'w-[164px] pointuserbar:w-[240px] mac:w-[380px] pointuserbar:h-[125px] h-[85px] mac:h-[197px]'
              : idx === 1
              ? 'w-[98px] pointuserbar:w-[136px] h-[98px] pointuserbar:h-[136px]'
              : 'w-[130px] pointuserbar:w-[222px] h-[91px] pointuserbar:h-[130px]'
          }`}
        />
      ))}
    </AnimatedWrapper>
  );
}
