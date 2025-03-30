'use client';

import Button from '@/components/UI/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Modal = ({ modalOpen, setModalOpen }) => {
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText('4441 1111 2222 4276');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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

        <div className="mt-6">
          <p className="text-gray-700">Або можете зробити переказ на карту:</p>
          <div className="mt-2 flex items-center justify-center border border-gray-300 rounded-lg p-2">
            <span className="font-bold text-[12px] mobileplus:text-lg">4441 1111 2222 4276</span>
            <button
              onClick={copyToClipboard}
              className="ml-3 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              title="Скопіювати номер картки"
            >
              <Image
                src="/copmetitionIcons/copy.svg"
                alt="copy icon"
                width={24}
                height={24}
              />
            </button>
          </div>
          {copied && <p className="text-green-600 mt-1">Номер скопійовано!</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
