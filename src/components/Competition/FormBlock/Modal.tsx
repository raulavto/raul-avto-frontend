"use client"

import Button from '@/components/UI/Button/Button';
import Link from 'next/link';
import { useEffect } from 'react';

const Modal = ({ modalOpen, setModalOpen }) => {
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={handleModalClose}
    >
      <div className="bg-white p-6 rounded-lg text-center w-[80%] max-w-[600px] mx-auto">
        <h2 className="text-[24px] text-red-600 font-bold">Вітаємо!</h2>
        <p>
          Ви зробили важливий крок до перемоги. Натисніть кнопку, щоб перейти до
          оплати.
        </p>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://send.monobank.ua/jar/96CygjGUtR"
          className="mt-10 flex justify-center"
        >
          <Button className="w-[60%] h-[54px] rounded-sub-block-12 bg-gradient-red text-[14px] text-white tablet:pr-5 ">
            "Оплатити через MonoPay"
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
