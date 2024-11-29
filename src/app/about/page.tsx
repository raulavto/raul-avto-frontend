'use client';
import { motion } from 'framer-motion';
import Hero from '@/components/Home/Hero/Hero';
import CarChoiceBody from '@/components/Home/CarChoiceBody/CarChoiceBody';
import CarChoiceMotoring from '@/components/Home/CarChoiceMotoring/CarChoiceMotoring';
import Trusted from '@/components/Home/Trusted/Trusted';
import ModesTransportation from '@/components/Home/ModesTransportation/ModesTransportation';
import PurchasingProcess from '@/components/Home/PurchasingProcess/PurchasingProcess';
import ContactUs from '@/components/Home/ContactUs/ContactUs';
import Proposals from '@/components/Home/Proposals/Proposals';
import About from '@/components/About/About';

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={blockVariants}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay: index * 0.5 }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const components = [<About />, <ContactUs />];

  return (
    <section>
      <div className="pl-3 pr-3">
        {components.map((Component, index) => (
          <AnimatedSection key={index} index={index}>
            {Component}
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
