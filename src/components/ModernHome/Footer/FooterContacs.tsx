'use client';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/footerContacts.json';
const FooterContacs = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  return (
    <div className="text-white">
      <h4 className="text-[18px] tablet:text-[20px] font-semibold mb-[14px]">
        {t.contacts_title}
      </h4>
      <a
        href="mailto:raulkogo@gmail.com"
        className="text-[14px] mb-[12px] tablet:text-[16px] font-medium inline-flex transition duration-300 ease-in-out hover:text-red-600"
      >
        {t.email}
      </a>
      <a
        href="https://maps.app.goo.gl/X1oGUQs9QWNe4h2q9"
        target="_blank"
        className="hover:text-red-600 transition duration-300 ease-in-out"
      >
        <div className="text-[14px] tablet:text-[16px] mb-[8px] font-medium">
          {t.address}
        </div>
        <div className="text-[14px] tablet:text-[16px] mb-[8px] font-medium">
          {t.office}
        </div>
        <div className="text-[14px] tablet:text-[16px] font-medium">502</div>
      </a>
    </div>
  );
};

export default FooterContacs;
