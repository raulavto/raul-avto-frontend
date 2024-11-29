'use client';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { GET_DYNAMIC_BLOG_POST } from '@/graphql/blogQueries';
import { IoMdTime } from 'react-icons/io';
import { IoStar } from 'react-icons/io5';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import useStore from '@/app/zustand/useStore';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import SliderNavigation from '@/components/UI/SliderNavigation/SliderNavigation';
import VideoPlayer from '@/components/UI/VideoPlayer/VideoPlayer';
import LoaderForApi from '@/components/UI/Loaders/LoaderForApi';
import EmptyMessage from '@/components/UI/EmptyMessage/EmptyMessage';

const DynamicBlogComponent = ({ slug }) => {
  const sliderRef = useRef(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = useStore((state) => state.language);
  const stars = Array(5).fill(0);
  const previewImage = '/banner-for-video.png';
  const placeholder = '/Placeholder.png';

  useEffect(() => {
    if (!slug || !language) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPH_QL_URL}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_QL_TOKEN}`,
            },
            body: JSON.stringify({
              query: GET_DYNAMIC_BLOG_POST,
              variables: { slug },
            }),
          }
        );

        const result = await response.json();
        setPost(result.data?.[language]);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, language]);

  if (loading) {
    return <LoaderForApi />;
  }

  if (!post) {
    return (
      <div className="text-3xl text-white h-screen flex justify-center items-center">
        <EmptyMessage />
      </div>
    );
  }

  return (
    <div className="pt-[30px] tabletplus:pt-[54px]">
      <Container>
        <div className="flex flex-col pointuserbar:flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-[26px] tablet:text-[32px] mx-auto pointuserbar:mx-0 mac:text-[48px] text-center pointuserbar:text-left text-white font-bold max-w-[400px] mac:max-w-[600px] mb-[32px]">
              {post.title || 'N/A'}
            </h1>
            <h2 className="max-w-[400px] mac:max-w-[631px] h-auto pointuserbar:h-[70px] overflow-auto scrollbar-hide mx-auto pointuserbar:mx-0 text-[16px] text-center pointuserbar:text-left text-white mb-[40px] pointuserbar:mb-[70px]">
              {post.subtitle || 'N/A'}
            </h2>
            <div className="flex items-center justify-center pointuserbar:justify-start mb-[20px] pointuserbar:mb-0 flex-wrap mt-auto gap-[20px] pointuserbar:gap-[46px]">
              <div className="flex items-center gap-[12px]">
                <div>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13.5C19.1935 13.5 20.3381 13.9741 21.182 14.818C22.0259 15.6619 22.5 16.8065 22.5 18C22.5 19.1935 22.0259 20.3381 21.182 21.182C20.3381 22.0259 19.1935 22.5 18 22.5C16.8065 22.5 15.6619 22.0259 14.818 21.182C13.9741 20.3381 13.5 19.1935 13.5 18C13.5 16.8065 13.9741 15.6619 14.818 14.818C15.6619 13.9741 16.8065 13.5 18 13.5ZM18 6.75C25.5 6.75 31.905 11.415 34.5 18C31.905 24.585 25.5 29.25 18 29.25C10.5 29.25 4.095 24.585 1.5 18C4.095 11.415 10.5 6.75 18 6.75ZM4.77 18C5.98238 20.4755 7.86496 22.5611 10.2037 24.0199C12.5425 25.4786 15.2436 26.252 18 26.252C20.7564 26.252 23.4575 25.4786 25.7963 24.0199C28.135 22.5611 30.0176 20.4755 31.23 18C30.0176 15.5245 28.135 13.4389 25.7963 11.9801C23.4575 10.5214 20.7564 9.74802 18 9.74802C15.2436 9.74802 12.5425 10.5214 10.2037 11.9801C7.86496 13.4389 5.98238 15.5245 4.77 18Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="text-white text-[16px] font-semibold">2.1K</div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div>
                  <IoMdTime color="white" className="w-[35px] h-[36px]" />
                </div>
                <div className="text-white text-[16px] font-semibold">
                  6 хв на читання
                </div>
              </div>
              <div className="flex items-center gap-[5px]">
                {stars.map((_, index) => (
                  <IoStar
                    key={index}
                    color={index < 5 ? '#F7B750' : 'white'}
                    className="w-[20px] h-[20px]"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative max-w-full max-h-full mx-auto pointuserbar:mx-0">
            {post.mainpic && (
              <Image
                src={post.mainpic.url || placeholder}
                alt={post.title || 'post decor image'}
                width={600}
                height={415}
                className="max-w-full h-full object-cover rounded-sub-block-12 tablet:rounded-sub-block-24"
              />
            )}
          </div>
        </div>
        <section className="pt-[80px] py-[80px] pointuserbar:pt-[200px] pointuserbar:pb-[186px]">
          <h3 className="uppercase text-[22px] tablet:text-[32px] pointuserbar:text-[36px] text-center pointuserbar:text-left text-white font-bold mb-[32px]">
            {post.p1title || 'N/A'}
          </h3>
          <p className=" text-[16px] text-white text-center pointuserbar:text-left font-medium mb-[60px] pointuserbar:mb-[110px]">
            {post.p1text || 'N/A'}
          </p>

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation={{
              nextEl: '.custom-next-for-dynamic-blog',
              prevEl: '.custom-prev-for-dynamic-blog',
            }}
            ref={sliderRef}
            loop
          >
            {post?.p1pics?.map((pic, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={pic.url || placeholder}
                  alt={`p1pic-${index}` || 'slider car photo'}
                  width={400}
                  height={200}
                  priority
                  className="w-full h-[220px] sm:h-[320px] tabletplus:h-[556px] object-cover rounded-sub-block-12 tablet:rounded-sub-block-24rounded-sub-block-12 tablet:rounded-sub-block-24"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderNavigation
            prevClass="custom-prev-for-dynamic-blog"
            nextClass="custom-next-for-dynamic-blog"
            prevIcon="/slider-prev.png"
            nextIcon="/slider-next.png"
          />
        </section>

        <section className="">
          <h3 className="uppercase text-[22px] tablet:text-[32px] pointuserbar:text-[36px] text-center pointuserbar:text-left text-white font-bold mb-[32px]">
            {post.p2title || 'N/A'}
          </h3>
          <p className="text-center pointuserbar:text-left text-white mb-[80px] tabletplus:mb-[110px]">
            {post.p2text || 'N/A'}
          </p>
          {post.p2vid ? (
            <div className="mb-[80px] tabletplus:mb-[110px]">
              <VideoPlayer url={post.p2vid} previewImage={previewImage} />
            </div>
          ) : (
            <div className="mb-[110px]">
              <img
                src={previewImage}
                alt="Image preview"
                className="w-full h-auto rounded-sub-block-12 tablet:rounded-sub-block-24"
              />
            </div>
          )}
        </section>

        {post.restparagraphs && post.restparagraphs.length > 0 && (
          <div>
            {post.restparagraphs.map((paragraph, index) => (
              <div key={index} className="mb-6">
                <h4 className="uppercase text-[22px] tablet:text-[32px] pointuserbar:text-[36px] text-center pointuserbar:text-left text-white font-bold mb-[32px]">
                  {paragraph.title || 'N/A'}
                </h4>
                <p className="text-[16px] text-center pointuserbar:text-left text-white mb-[80px] tabletplus:mb-[110px]">
                  {paragraph.text || 'N/A'}
                </p>
                {paragraph.photo && (
                  <Image
                    src={paragraph.photo.url || placeholder}
                    alt={paragraph.title || 'decor car photo'}
                    width={400}
                    height={200}
                    className="w-full h-[220px] sm:h-[320px] tabletplus:h-[556px] object-cover rounded-sub-block-12 tablet:rounded-sub-block-24"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default DynamicBlogComponent;
