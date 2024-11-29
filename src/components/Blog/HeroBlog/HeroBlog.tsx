'use client';
import Container from '@/components/Container/Container';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/blogBanner.json';
const HeroBlog = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <div className="relative mobile:py-[10px] tablet:py-[54px] bg-[url('/banner-blog.jpg')] mobile:bg-no-repeat mobile:bg-center mobile:bg-cover">
      <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      <Container>
        <div className="relative border-[1px] border-white rounded-sub-block-14 px-[15px] tablet:px-0 py-[80px] tablet:py-[157px]">
          <svg
            width="593"
            height="549"
            viewBox="0 0 593 549"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 right-0 w-[300px] h-[300px] tablet:w-[593px] tablet:h-[549px]"
          >
            <g filter="url(#filter0_f_269_1285)">
              <circle cx="524" cy="86" r="124" fill="#E2011A" />
            </g>
            <defs>
              <filter
                id="filter0_f_269_1285"
                x="0"
                y="-438"
                width="1048"
                height="1048"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="200"
                  result="effect1_foregroundBlur_269_1285"
                />
              </filter>
            </defs>
          </svg>
          <svg
            width="593"
            height="549"
            viewBox="0 0 593 549"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 w-[300px] h-[300px] tablet:w-[593px] tablet:h-[549px]"
          >
            <g filter="url(#filter0_f_269_1284)">
              <circle cx="69" cy="487" r="124" fill="#E2011A" />
            </g>
            <defs>
              <filter
                id="filter0_f_269_1284"
                x="-455"
                y="-37"
                width="1048"
                height="1048"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="200"
                  result="effect1_foregroundBlur_269_1284"
                />
              </filter>
            </defs>
          </svg>
          <h1 className="text-[40px] tablet:text-[88px] text-center uppercase text-white font-bold mb-[32px]">
            {t.title}
          </h1>
          <p className=" text-center text-white text-[16px] tablet:text-[20px] max-w-[636px] mx-auto">
            {t.description}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default HeroBlog;
