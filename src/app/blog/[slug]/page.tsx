import DynamicBlogComponent from '@/components/Blog/DynamicBlog/DynamicBlogComponent/DynamicBlogComponent';

interface ParamsSlug {
  params: {
    slug: string;
  };
}
const DynamiBlogPage = ({ params }: ParamsSlug) => {
  const { slug } = params;
  return (
    <section>
      <div className="relative">
        <div className="tabletplus:mb-[270px]">
          <DynamicBlogComponent slug={slug} />
        </div>
        <div className="hidden absolute bottom-[-6%] z-10 w-full tabletplus:block mobile-block-gradient-for-proposition-left h-[200px]"></div>
      </div>
    </section>
  );
};

export default DynamiBlogPage;
