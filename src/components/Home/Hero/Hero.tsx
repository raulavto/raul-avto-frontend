'use client';
import React, { useEffect, useState } from 'react';
import SearchAvto from '@/components/UI/SearchAvto/SearchAvto';
import { useMediaQuery } from 'usehooks-ts';
import { motion } from 'framer-motion';
import useStore from '../../../app/zustand/useStore';
import lang from '../../../app/lang/hero.json';

const Hero = () => {
  const isScreenInRange = useMediaQuery('(min-width: 1285px)');
  const [shouldRenderSearchAvto, setShouldRenderSearchAvto] = useState(false);
  const language = useStore((state) => state.language);

  useEffect(() => {
    setShouldRenderSearchAvto(true);
  }, []);

  const { title, description } = lang[language].hero;

  return (
    <>
      <div className="mobile:pt-8 bg-[url('/hero.png')] mobile:bg-no-repeat mobile:bg-right mobile:bg-contain tablet:bg-right desktop:bg-right desktop:bg-auto mobile:h-[200px] tablet:h-[350px] desktop:h-[800px] desktop:pt-[60px]">
        <div className="max-w-[1696px] mx-auto px-4">
          <motion.h1
            className="w-1/2 tablet:w-full text-left sm:bg-opacity-0 tablet:text-left mobile:text-[40px] lg:text-[80px] desktop:text-128 text-primary mb-4 lg:mb-6 desktop:mb-12 font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mobile:text-center mobile:text-secondary mobile:ml-auto mobile:mr-auto tablet:ml-0 tablet:mr-0 tablet:text-left tablet:max-w-[400px] tablet:text-secondary mobile:text-[18px] tablet:text-[24px] desktop:font-[500] desktop:text-28 desktop:max-w-[610px] desktop:mb-[40px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {description}
          </motion.p>
          {shouldRenderSearchAvto && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {isScreenInRange ? <SearchAvto /> : null}
            </motion.div>
          )}
        </div>
      </div>
      {shouldRenderSearchAvto && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {!isScreenInRange ? <SearchAvto /> : null}
        </motion.div>
      )}
    </>
  );
};

export default Hero;
