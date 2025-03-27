'use client';
import PartnersList from './PartnersList';
import { fadeInAnimation } from '@/app/utils/animation';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion } from 'framer-motion';

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-6 pointuserbar:pt-[70px] pointuserbar:pb-[101px] mb-[60px]"
    >
      <div className="container xl:max-w-[1440px]">
        <AnimatedWrapper
          animation={fadeInAnimation({ x: -50 })}
          className="mb-[29px] pointuserbar:mb-[69px] text-[25px] pointuserbar:text-[48px] font-bold leading-[1.23] uppercase text-[#F2EEEE] text-center"
        >
          Підпишись на наших Партнерів
        </AnimatedWrapper>
        <PartnersList />
      </div>
    </section>
  );
}
