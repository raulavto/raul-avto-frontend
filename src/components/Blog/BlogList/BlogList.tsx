'use client';
import { useEffect, useState } from 'react';
import { GET_BLOG_POSTS } from '@/graphql/blogQueries';
import useStore from '@/app/zustand/useStore';
import Image from 'next/image';
import Container from '@/components/Container/Container';
import translations from '../../../app/lang/homeProductList.json';
import LoaderForApi from '@/components/UI/Loaders/LoaderForApi';
import EmptyMessage from '@/components/UI/EmptyMessage/EmptyMessage';

const BlogList = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = useStore((state) => state.language);
  const t = translations[language];
  const placeholder = '/Placeholder.png';

  useEffect(() => {
    const fetchData = async () => {
      localStorage.getItem('language');
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPH_QL_URL}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_QL_TOKEN}`,
            },
            body: JSON.stringify({ query: GET_BLOG_POSTS }),
          }
        );

        const result = await response.json();
        setPosts(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoaderForApi />;
  }

  if (!posts || !posts[language]) {
    return (
      <div className="text-3xl text-white h-screen flex justify-center items-center">
        <EmptyMessage />
      </div>
    );
  }

  const blogPosts = posts[language];

  return (
    <div className="py-[80px] tablet:py-[200px]">
      <Container>
        <div className="grid gap-[20px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts?.map((post) => (
            <div key={post.slug} className="bg-white rounded-[20px]">
              {post.mainpic && (
                <Image
                  width={413}
                  height={203}
                  src={post.mainpic.url || placeholder}
                  alt={post.title || 'photo car'}
                  className="w-full h-[203px] object-cover rounded-[14px]"
                />
              )}
              <div className="p-[40px]">
                <h3 className="h-[105px] overflow-auto scrollbar-hide text-[24px] font-bold text-black mb-[18px]">
                  {post.title || 'N/A'}
                </h3>
                {/* <p className="h-[35px] overflow-auto scrollbar-hide  text-sm text-gray-400 mb-4">
                  {post.subtitle}
                </p> */}
                <p className="h-[93px] overflow-auto scrollbar-hide text-[16px] text-[#71717a] font-medium mb-[32px]">
                  {post.subtitle || 'N/A'}
                </p>
                <a
                  href={`/blog/${post.slug}`}
                  className="flex items-center justify-center w-full h-[40px] bg-transparent border-[1px] border-black rounded-sub-block-12 text-[14px] transform transition duration-300 ease-in-out hover:scale-[1.05] hover:text-red-600 will-change-transform"
                >
                  {t.view_details}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogList;
