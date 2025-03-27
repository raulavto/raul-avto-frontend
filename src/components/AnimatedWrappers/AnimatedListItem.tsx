'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedListItemProps {
  children: ReactNode;
  className: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

export default function AnimatedListItem({
  children,
  className = '',
}: AnimatedListItemProps) {
  return (
    <motion.li variants={itemVariants} className={className}>
      {children}
    </motion.li>
  );
}
