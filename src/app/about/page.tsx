'use client';
import { motion } from 'framer-motion';
import ContactUs from '@/components/Home/ContactUs/ContactUs';
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

export default function AboutPage() {
  const components = [<About />, <ContactUs />];

  return (
    <section>
      {components.map((Component, index) => (
        <AnimatedSection key={index} index={index}>
          {Component}
        </AnimatedSection>
      ))}
    </section>
  );
}
