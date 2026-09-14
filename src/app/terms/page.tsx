'use client';

import { motion } from 'framer-motion';
import Terms from '@/components/Terms/Terms';

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsPage() {
  return (
    <section className="pt-[30px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blockVariants}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <Terms />
      </motion.div>
    </section>
  );
}
