'use client';

import Button from '@/components/UI/Button/Button';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import DescriptionList from './DescriptionList';

const Banner = () => {
  return (
    <section className="pt-[49px] pb-14 pointuserbar:pt-[81px] pointuserbar:pb-[66px] relative max-w-[1440px] mx-auto">
      <div className="absolute z-[1] rounded-[59.5%] bg-black w-[60%] h-[119px]  pointuserbar:w-[746px] pointuserbar:h-[449px]  top-[-28px]  pretablet:top-[-16px] tablet:top-0 pointuserbar:top-[-186px] right-1/2 translate-x-1/2 flex justify-center pointuserbar:items-end items-center">
        <p className="text-[#F2EEEE] text-center font-bold text-[20px] tablet:text-[28px] leading-[1.23] pointuserbar:text-[52px] pointuserbar:pb-[71px] uppercase">
          ВИГРАЙ AUDI A8
          <br /> ЗА 200 ГРН!
        </p>
        <Link
          href="/competition/#conditions"
          className="absolute right-1/2 translate-x-1/2 w-[183px] pointuserbar:w-[366px] h-[32px]  pointuserbar:h-[58px] flex bottom-[-8px] pointuserbar:bottom-[-4px]"
        >
          <Button className="w-full rounded-sub-block-12 bg-gradient-red text-[14px] text-white h-full">
            Спробуй cвою удачу!
          </Button>
        </Link>
      </div>
      <div className="relative">
        <div className="relative min-h-[205px] pointuserbar:min-h-[610px] w-full aspect-video ">
          <ReactPlayer
            url="https://youtu.be/9vAOjXLT4hc?si=8H2Iri2yeg4gY6_x&rel=0"
            width="100%"
            height="100%"
            playing={true}
            muted={true} // Вимкнений звук, щоб не блокувався автозапуск
            playsinline={true}
            controls={true}
            className="w-full h-full"
          />
        </div>
        <div className="mt-6 pointuserbar:mt-0 pointuserbar:absolute pointuserbar:bottom-[50px] pointuserbar:w-[90%] pointuserbar:left-1/2 pointuserbar:-translate-x-1/2">
          <DescriptionList />
        </div>
      </div>
    </section>
  );
};

export default Banner;
