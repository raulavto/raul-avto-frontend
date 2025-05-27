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
      viewport={{ once: true, amount: 0.3 }}
      animation={listVariants({ staggerChildren: 0.5, delayChildren: 0.4 })}
      className="flex flex-row gap-3 max-w-[100%] mx-auto text-white"
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
              ? 'w-[120px] h-[82px] pointuserbar:w-[300px] mac:w-[350px] pointuserbar:h-[208px] mac:h-[240px]'
              : 'w-[80px] h-[55px] pointuserbar:w-[300px] mac:w-[350px] pointuserbar:h-[208px] mac:h-[240px]'
          }
        />
      ))}
    </AnimatedWrapper>
  );
}
