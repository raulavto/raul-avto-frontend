'use client';
import ConditionsList from './ConditionsList';
import { fadeInAnimation } from '@/app/utils/animation';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion } from 'framer-motion';

export default function Conditions() {
  return (
    <section className="relative z-10 pt-6 pb-10 pointuserbar:pt-[38px] pointuserbar:pb-[42px] mx-auto overflow-hidden">
      <div className="container xl:max-w-[1440px]">
        <AnimatedWrapper
          as={motion.h2}
          animation={fadeInAnimation({ x: -50 })}
          className="mb-6 pointuserbar:mb-[44px] text-[25px] pointuserbar:text-[48px] font-bold leading-[1.23] uppercase text-[#F2EEEE] text-center"
        >
          Умови Конкурсу
        </AnimatedWrapper>
        <ConditionsList />
        <AnimatedWrapper
          as={motion.p}
          animation={fadeInAnimation({ x: 50, delay: 1.2 })}
          className="max-w-[430px] pointuserbar:max-w-[736px] mt-[47px] mx-auto text-[12px] pointuserbar:text-[20px] font-semibold text-white text-center leading-[1.23]"
        >
          Частина зібраних коштів піде на дитячий будинок-інтернат у місті Київ
          для дітей з дефектами фізичного та розумового розвитку. Разом даруємо
          надію!
        </AnimatedWrapper>
      </div>
    </section>
  );
}
