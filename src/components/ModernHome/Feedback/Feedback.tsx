'use client';
import 'swiper/swiper-bundle.css';
import Container from '@/components/Container/Container';
import SliderNavigation from '@/components/UI/SliderNavigation/SliderNavigation';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/feedback.json';

const feedbackList = [
  {
    id: 1,
    name: 'Дмитрий Свистунов',
    rating: 5,
    time: '1 рік тому',
    text: 'Привозил через ребят Ford Fusion Всем доволен, на все мои вопросы ( их было немеряно) в процессе покупки/доставки отвечали оперативно C LA доплыла за 34 дня Работал с Раулем, работу выполнил на отлично Рекомендую !',
  },
  {
    id: 2,
    name: 'Олександр',
    rating: 5,
    time: '6 місяців тому',
    text: 'Дуже задоволений сервісом! Все пройшло швидко і без зайвих проблем. Автомобіль отримав у чудовому стані. Рекомендую!',
  },
  {
    id: 3,
    name: 'Марина',
    rating: 4,
    time: '3 місяці тому',
    text: 'Добра робота менеджерів. Трохи затримали доставку, але в іншому сервіс сподобався. Авто відповідає всім очікуванням.',
  },
  {
    id: 4,
    name: 'Ігор',
    rating: 5,
    time: '2 роки тому',
    text: 'Відмінний сервіс! Завжди на зв’язку, всі етапи прозорі. Задоволений роботою команди і своїм новим авто!',
  },
  {
    id: 5,
    name: 'Mr. Daniel',
    rating: 5,
    time: '6 місяців тому',
    text: 'Огромная благодарность менеджеру - Раулю, он помог подобрать и выбрать тот Автомобиль, однозначно порекомендую!! Брал этим летом: Ford Escape 2.5. С пробегом 32 тыс. миль. Считаю что это достойная покупка на свои деньги. По моим подсчётам, я сэкономил = от 4тыс. до 4.5 тыс$. Чему очень рад!',
  },
  {
    id: 6,
    name: 'Serhii Aplatov',
    rating: 5,
    time: '8 років тому',
    text: 'Брал у ребят BMW 530d е60, ещё в 2016. Пригнали за 6 дней. Выбирали долго и очень скрупульозно. Выбором был доволен. Машина-ракета. Привёл к ним брата, взял 320і и друзей. Взяли audi a3 и golf, мы с братом давно продали, а друзья растаможели и до сих пор катают. Ребята молодцы, работают, стараются. Думаю взять через ребят challenger или vw atlas. И отдельное спасибо Раулю, всегда можно подъехать, попить кофе, поговорить, посмотреть что есть.',
  },
];

const Feedback = () => {
  const sliderRef = useRef(null);
  const language = useStore((state) => state.language);
  const t = translations[language];
  return (
    <section className="relative py-[112px] mobile-block-gradient pointuserbar:py-[200px]">
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      <Container>
        <h2 className="uppercase text-[28px] pointuserbar:text-[48px] text-center text-white font-bold mb-[42px] pointuserbar:mb-[86px]">
          {t.feedback_title}
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: '.custom-next-thirt',
            prevEl: '.custom-prev-thirt',
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
          {feedbackList.map((feedback) => (
            <SwiperSlide key={feedback.id}>
              <div className="py-[28px] px-[32px] pointuserbar:py-[42px] pointuserbar:px-[36px] bg-white rounded-sub-block-14">
                <h3 className="text-[20px] pointuserbar:text-[24px] font-semibold mb-[15px]">
                  {feedback.name}
                </h3>
                <div className="flex items-center justify-between pointuserbar:justify-start pointuserbar:gap-[22px] mb-[15px]">
                  <div className="flex items-center">
                    {[...Array(feedback.rating)].map((_, index) => (
                      <Image
                        key={index}
                        src="/star-1.png"
                        alt="Star"
                        width={24}
                        height={24}
                        className="mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {feedback.time}
                  </p>
                </div>
                <p className="text-black text-[14px] pointuserbar:text-[16px]  h-[146px] pointuserbar:h-[100px] overflow-y-auto scrollbar-hide">
                  {feedback.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderNavigation
          prevClass="custom-prev-thirt"
          nextClass="custom-next-thirt"
          prevIcon="/slider-prev.png"
          nextIcon="/slider-next.png"
        />
      </Container>
    </section>
  );
};

export default Feedback;
