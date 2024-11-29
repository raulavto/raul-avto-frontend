'use client';
import { motion } from 'framer-motion';
import HeroPartnership from '../../components/Partnership/HeroPartnership/HeroPartnership';
import Advantages from '@/components/Partnership/Advantages/Advantages';
import Questions from '@/components/Partnership/Questions/Questions';
import Container from '@/components/Container/Container';

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={blockVariants}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const PartnershipPage = () => {
  return (
    <Container>
      <div className="mx-auto max-w-[1750px]">
        <AnimatedSection>
          <HeroPartnership />
        </AnimatedSection>
        <AnimatedSection>
          <Advantages />
        </AnimatedSection>
        <AnimatedSection>
          <Questions />
        </AnimatedSection>
      </div>
    </Container>
  );
};

export default PartnershipPage;
