'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { fadeInAnimation } from '@/app/utils/animation';

const ImageBlock = () => {
  return (
    <div className="relative h-[263px] w-[68px] mobileplus:w-[100px] mobileplus:h-[386px] pretablet:h-full pretablet:w-full ">
      <Image
        src="/competition-bg.webp"
        alt="road"
        width={212}
        height={263}
        className="h-full w-full object-cover object-left pretablet:hidden"
        quality={100}
      />
      <Image
        src="/competition-bg-2.webp"
        alt="road"
        width={212}
        height={263}
        className="h-full w-full object-cover object-left hidden pretablet:block"
        quality={100}
      />
      <div className="hidden wide:block absolute  bg-gradient-to-l from-[#0B0909] to-transparent w-[60px] h-full right-[-10px] top-0"></div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInAnimation({
          x: 120,
          y: -60,
          scale: 0.8,
          duration: 0.8,
          delay: 0.5,
        })}
        className="absolute right-[-37px] top-[29px] w-[218px] h-[218px] mobileplus:w-[318px] mobileplus:h-[318px] pretablet:right-5 pretablet:w-[116.7%] pretablet:h-full pretablet:top-0"
      >
        <Image
          src="/audi-competition.webp"
          alt="audi a8"
          fill
          className="object-contain"
          quality={100}
        />
      </motion.div>
      
    </div>
  );
};

export default ImageBlock;
