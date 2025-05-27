'use client';
import PartnersList from './PartnersList';
import { fadeInAnimation } from '@/app/utils/animation';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion } from 'framer-motion';

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-6 pointuserbar:pt-[70px] pointuserbar:pb-[101px] px-4"
    >
      <div className="max-w-[1280px] mx-auto">
        <AnimatedWrapper
          animation={fadeInAnimation({ x: -50 })}
          className="mb-[20px] text-[25px] pointuserbar:text-[48px] font-bold leading-[1.23] uppercase text-[#F2EEEE] text-center"
        >
          Наші Партнери
        </AnimatedWrapper>
        <PartnersList />
      </div>
    </section>
  );
}
