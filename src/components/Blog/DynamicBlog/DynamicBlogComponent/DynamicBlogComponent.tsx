'use client';
import 'swiper/css';
import { useEffect, useState, useRef } from 'react';
import { GET_DYNAMIC_BLOG_POST } from '@/graphql/blogQueries';
import { IoMdTime } from 'react-icons/io';
import { IoStar } from 'react-icons/io5';
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
  console.log(post);
  return (
    <div className="pt-[30px] tabletplus:pt-[54px] pb-16">
      <Container>
        <div className="flex flex-col pointuserbar:flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-[26px] tablet:text-[30px] mx-auto pointuserbar:mx-0 mac:text-[48px] text-center pointuserbar:text-left text-white font-bold max-w-[400px] mac:max-w-[600px] mb-[32px]">
              {post.title || 'N/A'}
            </h1>
            <h2 className="max-w-[400px] mac:max-w-[631px] h-auto overflow-auto scrollbar-hide mx-auto pointuserbar:mx-0 text-[19px] text-center pointuserbar:text-left text-white mb-[40px] pointuserbar:mb-[70px]">
              {post.subtitle || 'N/A'}
            </h2>
            <div className="flex items-center justify-center pointuserbar:justify-start mb-[20px] pointuserbar:mb-0 flex-wrap mt-auto gap-[20px] pointuserbar:gap-[46px]">
              <div className="flex items-center gap-[12px]">
                <IoMdTime color="white" className="w-[35px] h-[36px]" />
                <div className="text-white text-[20px] font-semibold">
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

        {/* First Section with HTML Rendering */}
        <section className="pt-[20px] py-[20px] pointuserbar:pt-[40px] pointuserbar:pb-[40px]">
          <h3 className="uppercase text-[20px] tablet:text-[30px] pointuserbar:text-[30px] text-center pointuserbar:text-left text-white font-bold mb-[32px]">
            {post.p1title || 'N/A'}
          </h3>
          <div
            className="text-[20px] text-white pointuserbar:text-left font-medium mb-[60px] pointuserbar:mb-[110px] custom-html"
            dangerouslySetInnerHTML={{ __html: post.p1text || 'N/A' }}
          />
        </section>

        {/* Second Section with HTML Rendering */}
        <section className="">
          <h3 className="uppercase text-[22px] tablet:text-[30px] pointuserbar:text-[30px] text-center pointuserbar:text-left text-white font-bold mb-[32px]">
            {post.p2title || 'N/A'}
          </h3>
          <div
            className="text-[20px] pointuserbar:text-left text-white mb-[80px] tabletplus:mb-[110px] custom-html"
            dangerouslySetInnerHTML={{ __html: post.p2text || 'N/A' }}
          />
        </section>

        {/* Render Paragraphs */}
        {post.restparagraphs &&
          post.restparagraphs.map((paragraph, index) => (
            <div key={index} className="mb-6">
              <h4 className="uppercase text-[22px] tablet:text-[30px] pointuserbar:text-[30px] text-center pointuserbar:text-left text-white font-bold mb-[32px]">
                {paragraph.title || 'N/A'}
              </h4>
              <div
                className="text-[20px] pointuserbar:text-left text-white mb-[80px] tabletplus:mb-[110px] custom-html"
                dangerouslySetInnerHTML={{ __html: paragraph.text || 'N/A' }}
              />
            </div>
          ))}
      </Container>
    </div>
  );
};

export default DynamicBlogComponent;
