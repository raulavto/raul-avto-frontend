'use client';
import SideMenu from '../SideMenu/SideMenu';
import { Squash as Hamburger } from 'hamburger-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const Burger = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  const isLeadForm = pathname === '/lead-form' || pathname === '/lead-form-thanks';

  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return ( !isLeadForm &&
    <div className="mobile:block  pointnav:hidden">
      <Hamburger toggled={isOpen} toggle={toggleMenu} color="white" />
      <SideMenu isOpen={isOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Burger;
