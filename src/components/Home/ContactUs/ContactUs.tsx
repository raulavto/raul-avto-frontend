'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/UI/Button/Button';
import { sendMessage } from '@/app/utils/sendMessage';
import useStore from '../../../app/zustand/useStore';
import lang from '../../../app/lang/contactUs.json';
import OrderBlock from '@/components/ModernHome/OrderBlock/OrderBlock';
import ContactsBlock from '@/components/ModernHome/ContactsBlock/ContactsBlock';

const ContactUs = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const language = useStore((state) => state.language);
  const texts = lang[language];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phoneMeText = texts.callBackMessage;
    if (phoneNumber.trim() !== '') {
      sendMessage(phoneMeText + phoneNumber);
      setPhoneNumber('');
    }
  };

  return (
    <div className="mobile:pb-[20px] desktop:pb-[80px] ">
      {/* <div className="flex justify-center items-center gap-[32px] mobile:flex-wrap tablet:flex-nowrap"> */}
      {/* <div className="mobile:flex mobile:flex-col mobile:items-center mobile:justify-center mobile:h-auto desktop:flex-row desktop:justify-normal desktop:w-[976px] desktop:h-[355px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-42 bg-gradient-sub-block p-16 gap-16">
          <Image
            className="mobile:w-[150px] mobile:h-[130px] desktop:w-[232px] desktop:h-[220px]"
            src="/call.png"
            alt="call icon"
            width={232}
            height={220}
          />
          <div>
            <div className="mobile:text-20 lg:text-34 mobile:text-center desktop:text-left fullhd:text-[38px] fullhd:text-40 text-primary font-bold max-w-[595px] mb-[40px]">
              <span className="block">{texts.callUs}</span>
              <span className="block">{texts.getConsultation}</span>
            </div>
            <a
              href="tel:+380737727373"
              className="mobile:w-[215px] mobile:mx-auto desktop:mx-0 desktop:max-w-[315px] fullhd:w-[315px] h-[60px] flex items-center justify-center bg-gradient-red py-[18px] px-[20px] rounded-sub-block-12 text-primary text-18 transform transition duration-300 ease-in-out hover:scale-105 hover:text-hoverprimary focus:outline-focus outline-none"
            >
              {texts.callNow}
            </a>
          </div>
        </div> */}
      {/* <div className="mobile:flex mobile:flex-col mobile:items-center mobile:justify-center mobile:h-auto mobile:p-6 desktop:w-[688px] desktop:h-[355px] desktop:items-start desktop:justify-start mobile:rounded-sub-block-10 tablet:rounded-sub-block-42 bg-gradient-sub-block desktop:p-16">
          <div className="flex items-center mb-[24px] mobile:w-[320px] desktop:w-[445px] h-[27px] bg-gradient-red p-2 rounded-sub-block-6 text-primary mobile:text-[11px] desktop:text-16">
            {texts.noCallBack}
          </div> */}
      {/* <div className="mobile:text-30 desktop:text-40 mobile:text-center desktop:text-left text-primary font-bold mb-[20px]">
            <span className="block">{texts.leaveNumber}</span>
            <span className="block">{texts.willCallBack}</span>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex gap-4 items-center flex-wrap desktop:flex-nowrap justify-center"
            >
              <input
                className="text-primary placeholder:text-placeholderText placeholder:text-18 placeholder:font-[500] flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] mobile:w-full desktop:w-[315px] h-[60px] focus:outline-focus outline-none"
                type="tel"
                name="phone"
                placeholder={texts.enterNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                className="mobile:w-full desktop:w-[136px] h-[60px] rounded-sub-block-12 bg-gradient-red flex items-center justify-center text-primary text-18 px-[20px] py-[18px]"
                type="submit"
              >
                {texts.submit}
              </Button>
            </form>
          </div> */}
      <ContactsBlock />
      <OrderBlock />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default ContactUs;
