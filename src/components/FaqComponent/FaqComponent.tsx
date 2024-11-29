'use client';
import Image from 'next/image';
import useStore from '../../app/zustand/useStore';
// import translations from '../../app/lang/aboutme.json';
// import translationsFaq from '../../app/lang/faq.json';
import Container from '../Container/Container';
import ContactIcon from '../UI/ContactIcon/ContactIcon';
import AccordionFaq from './AccordionFaq';
import { contactIcons } from './contactIcons';

const FaqComponent = () => {
  // const language = useStore((state) => state.language);

  // const {
  //   delivery_items,
  //   purchase_benefits_items,
  //   text_1,
  //   text_2,
  //   advantages_title,
  //   delivery_time,
  //   delivery_includes,
  //   purchase_benefits_title,
  //   minimum_budget,
  //   minimum_budget_details,
  //   pre_purchase_info,
  //   us_market_info,
  //   contact_us,
  // } = translationsFaq[language];

  // const { adminName, adminTitle, contactPhone } = translations[language];

  // if (!translations[language]) {
  //   throw new Error(`Translations for language "${language}" not found.`);
  // }

  return (
    <div className="pt-[30px] tablet:pt-[60px]">
      <Container>
        <div className="tabletplus:flex tabletplus:space-x-6 mx-auto">
          {/* Left block with image */}
          <div className="flex-1 flex items-center justify-center mb-[32px] tablet:mb-0">
            <Image
              src="/porsche-bg.jpg"
              alt="admin photo"
              width={800}
              height={800}
              className="rounded-2xl object-cover w-full h-full"
            />
          </div>
          {/* Right block with info */}
          <div className="flex-1 tabletplus:w-3/5 mobile:mt-3 tabletplus:mt-0 p-[32px] bg-transparent rounded-[20px] border-[1px] border-white flex flex-col">
            <h2 className="text-[40px] leading-[45px] mb-[20px] text-primary text-center font-bold">
              {/* {adminName} */}
              FAQ
            </h2>
            {/* <div className="font-medium text-[16px] text-secondary text-center mb-[22px]">
              {adminTitle}
            </div>
            <p className="text-[18px] text-secondary mb-[20px]">{text_1}</p>
            <p className="text-[18px] text-secondary mb-[20px]">{text_2}</p>
            <div className="text-[18px] text-secondary mb-[20px]">
              {advantages_title}
            </div> */}
            <AccordionFaq />
          </div>
        </div>

        {/* <div className="">
          <h3 className="text-[22px] tablet:text-[32px] pointuserbar:text-[36px] text-center text-white font-bold mb-[20px] mt-[80px]">
            {delivery_time}
          </h3>
          <h4 className="text-[16px] tablet:text-[24px] pointuserbar:text-[32px] text-center font-bold text-secondary mb-[32px]">
            {delivery_includes}
          </h4>
          <ul className="list-disc pl-[30px] text-secondary mb-[32px] text-[18px] tabletplus:text-[22px]">
            <li>{delivery_items.items_1_1}</li>
            <li>{delivery_items.items_1_2}</li>
            <li>{delivery_items.items_1_3}</li>
            <li>{delivery_items.items_1_4}</li>
          </ul>
          <h3 className="text-[22px] tablet:text-[32px] pointuserbar:text-[36px] text-center text-white font-bold mb-[32px]">
            {purchase_benefits_title}
          </h3>
          <ul className="list-disc pl-[30px] text-secondary mb-[32px] text-[18px] tabletplus:text-[22px]">
            <li>{purchase_benefits_items.items_2_1}</li>
            <li>{purchase_benefits_items.items_2_2}</li>
            <li>{purchase_benefits_items.items_2_3}</li>
            <li>{purchase_benefits_items.items_2_4}</li>
          </ul>
          <h3 className="text-[22px] tablet:text-[32px] pointuserbar:text-[36px] text-center text-white font-bold mb-[32px]">
            {minimum_budget}
          </h3>
          <p className="text-[18px] tabletplus:text-[22px] text-center tabletplus:text-left text-secondary mb-[20px] tabletplus:mb-[50px]">
            {minimum_budget_details}
          </p>
          <p className="text-[18px] tabletplus:text-[22px] text-center tabletplus:text-left text-secondary mb-[20px] tabletplus:mb-[50px]">
            {pre_purchase_info}
          </p>
          <p className="text-[18px] tabletplus:text-[22px] text-center tabletplus:text-left text-secondary mb-[20px] tabletplus:mb-[50px]">
            {us_market_info}
          </p>
          <p className="text-[18px] tabletplus:text-[22px] text-center tabletplus:text-left text-secondary mb-[20px] tabletplus:mb-[50px]">
            {contact_us}
          </p>
        </div> */}
        {/* <div className="flex flex-col gap-4 mb-[25px] mt-4">
          <a
            className="w-full max-w-[300px] mx-auto rounded-sub-block-10 h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-10 bg-input text-16 font-bold text-primary transition duration-300 hover:scale-105"
            href={`tel:+380937767373`}
          >
            +380 93 776 73 73
          </a>
          <a
            className="w-full max-w-[300px] mx-auto rounded-sub-block-10 h-[44px] flex items-center justify-center py-[14px] px-[24px] rounded-10 bg-input text-16 font-bold text-primary transition duration-300 hover:scale-105"
            href="https://t.me/raul_avto_search"
            target="_blank"
          >
            @raul_avto_search
          </a>
        </div>
        <div className="flex gap-4 mobile:items-center mobile:justify-center">
          {contactIcons.map((icon, index) => (
            <ContactIcon
              key={index}
              href={icon.href}
              src={icon.src}
              alt={icon.alt}
            />
          ))}
        </div> */}
      </Container>
    </div>
  );
};

export default FaqComponent;
