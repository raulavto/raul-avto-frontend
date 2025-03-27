import PartnerItem from './PartnerItem';
import AnimatedWrapper from '@/components/AnimatedWrappers/AnimatedWrapper';
import { motion } from 'framer-motion';
import { listVariants } from '@/app/utils/animation';

export default function PartnersList() {
  const partnersList = [
    {
      title: 'Авто з США',
      url: 'https://www.instagram.com/raul_avto/',
      image: 'raulAvto',
    },
    {
      title: 'ГРУЗИНСЬКА КУХНЯ',
      url: 'https://www.instagram.com/miminoshi.kyiv/',
      image: 'miminoshi',
    },
  ];

  return (
    <AnimatedWrapper
      as={motion.ul}
      viewport={{ once: true, amount: 0.6 }}
      animation={listVariants({ staggerChildren: 0.5, delayChildren: 0.4 })}
      className="flex flex-col pretablet:flex-row pretablet:justify-between gap-6 max-w-[1296px] mx-auto text-white"
    >
      {partnersList.map((partner, idx) => (
        <PartnerItem
          key={idx}
          partner={partner}
          blurStyles={
            idx === 0
              ? 'top-[-38px] left-[-37px] pointuserbar:left-[-16px] pointuserbar:top-auto pointuserbar:bottom-[33px]'
              : 'top-[86px] right-3 pointuserbar:right-[-45px] pointuserbar:top-auto pointuserbar:bottom-[178px]'
          }
          imageStyles={
            idx === 0
              ? 'w-[230px] h-[157px] pointuserbar:w-[387px] mac:w-[447px] pointuserbar:h-[268px] mac:h-[309px]'
              : 'w-[141px] h-[141px] mt-2 pointuserbar:w-[231px] mac:w-[271px] pointuserbar:h-[231px] mac:h-[271px]'
          }
        />
      ))}
    </AnimatedWrapper>
  );
}
