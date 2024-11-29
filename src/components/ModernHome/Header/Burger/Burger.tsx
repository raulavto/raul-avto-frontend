'use client';
import SideMenu from '../SideMenu/SideMenu';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
const Burger = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="mobile:block  pointnav:hidden">
      <Hamburger toggled={isOpen} toggle={toggleMenu} color="white" />
      <SideMenu isOpen={isOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Burger;
