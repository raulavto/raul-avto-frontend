import AnimatedListItem from '@/components/AnimatedWrappers/AnimatedListItem';
import Button from '@/components/UI/Button/Button';
import Link from 'next/link';

interface ConditionItemProps {
  condition: {
    number: string;
    title: string;
    description: string;
    button: string;
    url: string;
  };
  className?: string;
}

export default function ConditionItem({
  condition,
  className = '',
}: ConditionItemProps) {
  const { number, title, description, button, url } = condition;
  return (
    <AnimatedListItem className="relative z-10 pointuserbar:max-w-[235px] xl:max-w-[255px]">
      <div
        className={`absolute -z-10 w-[164px] h-[183px] bg-[#E2011A] blur-[150px] supports-[backdrop-filter]:blur-[150px] will-change-transform ${className}`}
      ></div>
      <p className="mb-[10px] pointuserbar:mb-9 text-[120px] pointuserbar:text-[179px] font-bold leading-[1.23] bg-gradient-to-b from-[#FFACB5] to-[#E2011A] text-transparent bg-clip-text text-center">
        {number}
      </p>
      <h3 className="mb-[10px] pointuserbar:mb-[18px] text-20 pointuserbar:text-[25px] font-bold leading-[1.23] uppercase text-center">
        {title}
      </h3>
      <p className="mb-4 text-16 font-normal leading-[1.23] text-center">
        {description}
      </p>
      <Link href={url}>
        <Button className="w-[275px] pointuserbar:w-full rounded-[14px] px-4 py-[13.5px] mx-auto text-[14px] font-semibold leading-[1.23]">
          {button}
        </Button>
      </Link>
    </AnimatedListItem>
  );
}
