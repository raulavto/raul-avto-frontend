'use client';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import Container from '@/components/Container/Container';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Button from '@/components/UI/Button/Button';
import SliderNavigation from '@/components/UI/SliderNavigation/SliderNavigation';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/auction.json';

const auctions = [
  {
    id: 1,
    key: 'copart',
    logo: '/copart-auction.png',
    width: 185,
    height: 70,
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 2,
    key: 'manheim',
    logo: '/manheim-auctiom.png',
    width: 108,
    height: 108,
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 3,
    key: 'adesa',
    logo: '/adessa-auction.png',
    width: 185,
    height: 67,
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 4,
    key: 'iaa',
    logo: '/iaai-auction.png',
    width: 132,
    height: 78,
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 5,
    key: 'impact',
    logo: '/impact-icon.png',
    width: 184,
    height: 50,
    url: 'https://t.me/RaulAvto',
  },
];

const AuctionsList = () => {
  const sliderRef = useRef(null);
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <section>
      <Container>
        <h2 className="text-[28px] uppercase text-center text-white font-bold mb-[42px]  pointuserbar:text-[42px]  pointuserbar:mb-[86px]">
          {t.auction_title}
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          ref={sliderRef}
          loop
          breakpoints={{
            900: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        >
          {auctions.map((auction) => (
            <SwiperSlide key={auction.id} className="mx-auto px-[5px]">
              <div className="flex flex-col h-[480px] rounded-[20px] border border-white py-[52px] px-[20px] desktop:py-[54px] desktop:px-[70px] pointuserbar:w-full pointuserbar:max-w-[413px]">
                <Image
                  src={auction.logo}
                  alt={`${auction.key} logo`}
                  width={auction.width}
                  height={auction.height}
                  className="mb-[56px] mx-auto"
                />
                <h3 className="uppercase text-[24px] font-bold mb-[14px] text-white text-center">
                  {t[`${auction.key}_name`]}
                </h3>
                <p className="text-[14px] text-center text-white mb-[36px] pointuserbar:mb-[56px]">
                  {t[`${auction.key}_description`]}
                </p>
                <a
                  href={auction.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto mt-auto w-full max-w-[185px]"
                >
                  <Button className="bg-transparent w-full py-[10px] px-[44px] rounded-sub-block-12 border border-white text-white text-[14px] hover:scale-105">
                    {t.view_details}
                  </Button>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderNavigation
          prevClass="custom-prev"
          nextClass="custom-next"
          prevIcon="/slider-prev.png"
          nextIcon="/slider-next.png"
        />
      </Container>
    </section>
  );
};

export default AuctionsList;
