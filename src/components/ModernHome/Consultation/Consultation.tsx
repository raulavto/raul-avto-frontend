'use client';
import { motion } from 'framer-motion';
import Button from '@/components/UI/Button/Button';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/homeConsultation.json';

const Consultation = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-[94px] px-[40px] pointuserbar:py-[52px] mobile:bg-[url('/consultation-mobile.jpg')] tablet:bg-[url('/consultation-desktop.jpg')] mobile:bg-no-repeat mobile:bg-center mobile:bg-cover"
      style={{ backgroundPosition: 'calc(50% - 15px) center' }}
    >
      {/* Верхняя тень */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-x-0 top-0 h-[40px] bg-gradient-to-b from-black to-transparent pointer-events-none"
      ></motion.div>

      {/* Нижняя тень */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-black to-transparent pointer-events-none"
      ></motion.div>

      {/* Левая тень */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-y-0 left-0 w-[40px] bg-gradient-to-r from-black to-transparent pointer-events-none"
      ></motion.div>

      {/* Правая тень */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-y-0 right-0 w-[40px] bg-gradient-to-l from-black to-transparent pointer-events-none"
      ></motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto uppercase text-center text-[28px] pointuserbar:text-[48px] pointuserbar:max-w-[440px] text-white font-bold mb-[16px]"
      >
        {t.consultation_title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="uppercase text-center text-[16px] pointuserbar:text-[24px] text-red-600 font-bold mb-[52px] pointuserbar:mb-[88px]"
      >
        {t.consultation_subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.7 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto w-full max-w-[313px] pointuserbar:max-w-[205px]"
      >
        <a href="tel:+380 73 772 73 73">
          <Button className="bg-gradient-red w-full h-[60px] pointuserbar:h-[40px] rounded-sub-block-12 text-[14px] text-white font-semibold">
            {t.consultation_button}
          </Button>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Consultation;
