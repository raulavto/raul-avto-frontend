'use client';
import { motion } from 'framer-motion';
import OurCoordinates from '@/components/Contacts/OurCoordinates/OurCoordinates';
import AdminContacts from '@/components/Contacts/AdminContacts/AdminContacts';
import DepartmentContacts from '@/components/Contacts/DepartmentContacts/DepartmentContacts';

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedSection = ({ children, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={blockVariants}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay: index * 0.3 }}
  >
    {children}
  </motion.div>
);

const ContactsPage = () => {
  const components = [
    <OurCoordinates />,
    <AdminContacts />,
    <DepartmentContacts />,
  ];

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
};

export default ContactsPage;
