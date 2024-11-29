'use client';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/footerCall.json';
const FooterCall = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  return (
    <div className="text-white border-[1px] border-white rounded-sub-block-16 py-[20px] px-[37px] tablet:py-[28px] tablet:px-[20px]">
      <h5 className="max-w-[203px] text-white text-center text-[20px] uppercase font-semibold mb-[20px]">
        {t.call_title}
      </h5>
      <a
        className="w-full max-w-[239px] h-[54px] px-[10px] flex justify-center items-center rounded-sub-block-12 bg-red-600 text-[14px] font-semibold transform transition duration-300 ease-in-out hover:scale-105 animate-pulse"
        href="tel:+380737727373"
      >
        +38 073 772 7373
      </a>
    </div>
  );
};

export default FooterCall;
