import HeroBlog from '@/components/Blog/HeroBlog/HeroBlog';
import BlogList from '@/components/Blog/BlogList/BlogList';
import { Montserrat } from 'next/font/google';
import Consultation from '@/components/ModernHome/Consultation/Consultation';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});
const BlogPage = () => {
  return (
    <section className={`${montserrat.className} pt-[30px]`}>
      <HeroBlog />
      <BlogList />
      <div className="relative">
        <div className="tabletplus:mb-[200px]">
          <Consultation />
        </div>

        <div className="hidden absolute bottom-[-43%] z-10 w-full tabletplus:block mobile-block-gradient-for-proposition-left h-[200px]"></div>
      </div>
    </section>
  );
};

export default BlogPage;
