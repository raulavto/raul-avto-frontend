'use client';
import 'swiper/swiper-bundle.css';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import SliderNavigation from '@/components/UI/SliderNavigation/SliderNavigation';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Button from '@/components/UI/Button/Button';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/homeProductList.json';

const carList = [
  {
    id: 5,
    image: '/car-audi-q3.jpg',
    title: 'AUDI Q3 2022',
    price: '7 000$',
    usaPrice: '27 000$',
    ukrainePrice: '36 000$',
    savings: '13 625$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 6,
    image: '/car-bmw-m440i.jpg',
    title: 'BMW M440I 2022',
    price: '7 000$',
    usaPrice: '39 000$',
    ukrainePrice: '58 000$',
    savings: '22 275$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 7,
    image: '/car-ford-escape.jpg',
    title: 'FORD Escape 2020',
    price: '7 000$',
    usaPrice: '15 000$',
    ukrainePrice: '20 000$',
    savings: '5 100$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 8,
    image: '/car-mazda-cx-3.jpg',
    title: 'MAZDA CX-3 2019',
    price: '7 000$',
    usaPrice: '12 300$',
    ukrainePrice: '19 000$',
    savings: '3 200$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 9,
    image: '/car-mazda-cx-5.jpg',
    title: 'MAZDA CX-5 2022',
    price: '7 000$',
    usaPrice: '17 450$',
    ukrainePrice: '23 500$',
    savings: '9 800$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 10,
    image: '/car-nissan-370Z.jpg',
    title: 'NISSAN 370Z 2018',
    price: '7 000$',
    usaPrice: '14 540$',
    ukrainePrice: '20 000$',
    savings: '3 400$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 11,
    image: '/car-rivian-r1t.jpg',
    title: 'RIVANA R1T 2022',
    price: '7 000$',
    usaPrice: '37 000$',
    ukrainePrice: '58 000$',
    savings: '23 500$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 12,
    image: '/car-subaru-crosstrek.jpg',
    title: 'SUBARU CROSSTREK 2021',
    price: '7 000$',
    usaPrice: '32 000$',
    ukrainePrice: '55 000$',
    savings: '5 350$',
    url: 'https://t.me/RaulAvto',
  },
  {
    id: 13,
    image: '/car-volvo-xc40.jpg',
    title: 'VOLVO XC40 2021',
    price: '7 000$',
    usaPrice: '25 000$',
    ukrainePrice: '33 000$',
    savings: '11 600$',
    url: 'https://t.me/RaulAvto',
  },
];

const HomeProductList = () => {
  const sliderRef = useRef(null);
  const language = useStore((state) => state.language);
  const t = translations[language];
  return (
    <section className="pt-[112px] pointuserbar:py-[200px]">
      <Container>
        <h2 className="uppercase text-[28px] pointuserbar:text-[48px] text-center text-white font-bold mb-[42px] pointuserbar:mb-[86px] max-w-[315px] pointuserbar:max-w-full mx-auto">
          {t.home_product_list_title}
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: '.custom-next-second',
            prevEl: '.custom-prev-second',
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
          {carList.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="flex flex-col w-full mx-auto pb-[32px] bg-white rounded-sub-block-14">
                <Image
                  src={card.image}
                  alt={`${card.title} photo`}
                  width={300}
                  height={200}
                  className="w-full h-[203px] rounded-sub-block-14 mb-[32px] pointuserbar:mb-[40px]"
                />
                <div className="px-[24px] flex flex-col h-full">
                  <h3 className="h-[28px] sm:h-[50px] pointuserbar:h-[28px] text-[20px] pointuserbar:text-[24px] font-bold text-black mb-[18px]">
                    {card.title}
                  </h3>
                  <p className="text-red-600 text-[28px] pointuserbar:text-[32px] font-bold mb-[18px]">
                    {card.usaPrice}
                  </p>

                  <p className="flex justify-between mb-[12px] text-[14px] pointuserbar:text-[16px] font-medium">
                    {t.car_usa_price}
                    <span className="inline-flex">{card.usaPrice}</span>
                  </p>
                  <p className="flex justify-between mb-[12px] text-[14px] pointuserbar:text-[16px] font-medium">
                    {t.car_ukraine_price}{' '}
                    <span className="inline-flex">{card.ukrainePrice}</span>
                  </p>
                  <p className="flex justify-between text-[14px] pointuserbar:text-[16px] font-medium mb-[32px]">
                    {t.car_savings}{' '}
                    <span className="inline-flex">{card.savings}</span>
                  </p>

                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-[265px] pointuserbar:max-w-full mx-auto mt-auto transform transition duration-300 ease-in-out hover:scale-105"
                  >
                    <Button className="w-full h-[40px] bg-transparent border-[1px] border-black rounded-sub-block-12 text-[14px] hover:text-red-600">
                      {t.view_details}
                    </Button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderNavigation
          prevClass="custom-prev-second"
          nextClass="custom-next-second"
          prevIcon="/slider-prev.png"
          nextIcon="/slider-next.png"
        />
      </Container>
    </section>
  );
};

export default HomeProductList;
