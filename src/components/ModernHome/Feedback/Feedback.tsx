'use client';
import 'swiper/swiper-bundle.css';
import Container from '@/components/Container/Container';
import SliderNavigation from '@/components/UI/SliderNavigation/SliderNavigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/feedback.json';
import {
  FALLBACK_FEEDBACK,
  FeedbackItem,
  formatRelativeReviewTime,
} from '@/data/feedbackFallback';

type GoogleReviewDto = {
  id: string;
  name: string;
  rating: number;
  text: string;
  createTime: string | null;
  profilePhotoUrl: string | null;
};

type GoogleReviewsApiResponse = {
  reviews?: GoogleReviewDto[];
  source?: string;
};

const Feedback = () => {
  const sliderRef = useRef(null);
  const language = useStore((state) => state.language);
  const t = translations[language] || translations.ua;
  const [googleReviews, setGoogleReviews] = useState<GoogleReviewDto[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews', {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = (await response.json()) as GoogleReviewsApiResponse;
        const reviews = data.reviews || [];

        if (!cancelled && reviews.length > 0) {
          setGoogleReviews(reviews);
        }
      } catch (error) {
        console.error('[Feedback] failed to load Google reviews:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const feedbackList: FeedbackItem[] = useMemo(() => {
    if (!googleReviews?.length) return FALLBACK_FEEDBACK;

    return googleReviews.map((review) => ({
      id: review.id,
      name: review.name,
      rating: review.rating,
      text: review.text,
      profilePhotoUrl: review.profilePhotoUrl,
      time: formatRelativeReviewTime(review.createTime, {
        justNow: t.just_now,
        minute: t.minute,
        minutes: t.minutes,
        hour: t.hour,
        hours: t.hours,
        day: t.day,
        days: t.days,
        month: t.month,
        months: t.months,
        year: t.year,
        years: t.years,
      }),
    }));
  }, [googleReviews, t]);

  const isFromGoogle = Boolean(googleReviews?.length);

  return (
    <section className="relative py-[112px] mobile-block-gradient pointuserbar:py-[200px]">
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      <Container>
        <h2 className="uppercase text-[28px] pointuserbar:text-[48px] text-center text-white font-bold mb-[18px] pointuserbar:mb-[28px]">
          {t.feedback_title}
        </h2>
        <p
          className={`text-center text-[13px] text-white/70 mb-[42px] pointuserbar:mb-[70px] ${
            isFromGoogle ? '' : 'invisible'
          }`}
        >
          {t.powered_by_google}
        </p>
        {isLoading && !feedbackList.length ? (
          <p className="text-center text-white/70">{t.loading}</p>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={3}
              navigation={{
                nextEl: '.custom-next-thirt',
                prevEl: '.custom-prev-thirt',
              }}
              ref={sliderRef}
              loop={feedbackList.length > 3}
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
                    <div className="mb-[15px] flex items-center gap-3">
                      {feedback.profilePhotoUrl ? (
                        <Image
                          src={feedback.profilePhotoUrl}
                          alt={feedback.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : null}
                      <h3 className="text-[20px] pointuserbar:text-[24px] font-semibold">
                        {feedback.name}
                      </h3>
                    </div>
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
                      {feedback.time ? (
                        <p className="text-[10px] text-gray-500 font-medium">
                          {feedback.time}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-black text-[14px] pointuserbar:text-[16px] h-[146px] pointuserbar:h-[100px] overflow-y-auto scrollbar-hide">
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
          </>
        )}
      </Container>
    </section>
  );
};

export default Feedback;
