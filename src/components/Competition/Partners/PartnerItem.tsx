import AnimatedListItem from '@/components/AnimatedWrappers/AnimatedListItem';
import Button from '@/components/UI/Button/Button';
import Image from 'next/image';

interface PartnerItemProps {
  partner: { title: string; url: string; image: string };
  imageStyles?: string;
  blurStyles?: string;
}

export default function PartnerItem({
  partner,
  imageStyles = '',
  blurStyles = '',
}: PartnerItemProps) {
  const { title, image, url } = partner;

  return (
    <AnimatedListItem className="relative z-10 flex flex-col justify-between w-[calc(50%-6px)] px-2 pt-2 pb-[20px] pointuserbar:py-[44px] rounded-[12px] bg-[#3d3c3c80] bg-opacity-50">
      <div
        className={`absolute -z-10 w-[133px] h-[177px] pointuserbar:w-[158px] pointuserbar:h-[177px] bg-[#E2011A] blur-[150px] supports-[backdrop-filter]:blur-[150px] will-change-transform ${blurStyles}`}
      ></div>
      <div className={`relative mb-[10px] mx-auto ${imageStyles}`}>
        <Image src={`/competition/${image}.webp`} alt={title} fill />
      </div>
      <div>
        <h3 className="mb-3 pointuserbar:mb-10 text-[16px] pointuserbar:text-[36px] font-bold leading-[1.23] text-center">
          {title}
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="instagram link"
        >
          <Button className="w-full max-w-[200px] pointuserbar:max-w-[317px] px-3 py-[10px] mx-auto rounded-[12px] text-[12px] pointuserbar:text-[16px] font-semibold leading-[1.23]">
            Підписатися
          </Button>
        </a>
      </div>
    </AnimatedListItem>
  );
}
