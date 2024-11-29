'use client';
import { motion } from 'framer-motion';

const AnimatedStep = ({ number, title, description, index }) => {
  // Определяем задержку для анимации в зависимости от значения `number`
  const delay =
    number > 6
      ? (number / 3) * 0.3 + 0.1
      : number > 3
      ? (number / 2) * 0.3 + 0.1
      : number * 0.3 + 0.1;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
      className={`flex gap-4 pointuserbar:gap-[32px] items-start step-item ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      } pointuserbar:flex-row lg:w-[calc(33%-35px)]`}
    >
      {/* Анимация для номера шага */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay - 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-[102px] font-bold bg-gradient-to-b from-[#ffacb5] to-[#e2011a] bg-clip-text text-transparent"
      >
        {number}
      </motion.div>

      <div>
        <h3 className="uppercase text-[20px] pointuserbar:text-[24px] font-bold mb-3 pointuserbar:mb-[20px] max-w-[250px]">
          {title}
        </h3>
        <p className="text-[14px] pointuserbar:text-[18px] max-w-[250px]">
          {description}
        </p>
      </div>
    </motion.li>
  );
};

export default AnimatedStep;
