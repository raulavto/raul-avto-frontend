'use client';
import ConditionsList from './ConditionsList';
import { fadeInAnimation } from '@/app/utils/animation';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion } from 'framer-motion';
import Help from '../Help/Help';

export default function Conditions() {
  return (
    <section className="relative z-10 pt-6 pb-10 pointuserbar:pt-[38px] pointuserbar:pb-[42px] mx-auto overflow-x-hidden">
      <div className="container xl:max-w-[1440px]">
        <AnimatedWrapper
          as={motion.h2}
          animation={fadeInAnimation({ x: -50 })}
          className="mb-6 pointuserbar:mb-[44px] text-[25px] pointuserbar:text-[48px] font-bold leading-[1.23] uppercase text-[#F2EEEE] text-center"
        >
          Умови Конкурсу
        </AnimatedWrapper>
        <ConditionsList />
      </div>
    </section>
  );
}
