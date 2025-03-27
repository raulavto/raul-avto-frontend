import Image from 'next/image';

interface PrizeItemProps {
  prize: { number: string; image: string; title: string; description: string };
  className?: string;
}

export default function PrizeItem({ prize, className = '' }: PrizeItemProps) {
  const { number, image, title, description } = prize;

  return (
    <li
      className={`${
        image === 'car'
          ? 'pointuserbar:order-2 pointuserbar:w-[346px] mac:w-[463px] mac:h-[523px] pointuserbar:pt-[45px] pointuserbar:pb-[53px] pointuserbar:px-[30px]'
          : image === 'money'
          ? 'pointuserbar:order-1 pointuserbar:w-[328px] pointuserbar:h-[362px] mac:h-[347px] pointuserbar:pt-5 pointuserbar:pb-10 pointuserbar:px-[18px]'
          : 'pointuserbar:order-3 pointuserbar:w-[328px] pointuserbar:h-[362px] mac:h-[347px] pointuserbar:pt-5 pointuserbar:pb-10 pointuserbar:px-[18px]'
      } relative z-10 px-[38px] pt-4 pb-7 rounded-[32px] bg-[#3d3c3c4d] bg-opacity-30`}
    >
      <p
        className={`${
          image === 'car' ? 'block' : 'hidden'
        } absolute z-10 top-[-31px] pointuserbar:top-[-62px] left-[calc(50%-86.5px)] pointuserbar:left-0 pointuserbar:w-full p-[10px] pointuserbar:p-[21px] text-[16px] pointuserbar:text-[24px] mac:text-[28px] font-semibold leading-[1.23] text-center uppercase rounded-[12px] border border-[#E2011A]`}
      >
        Головний Приз
      </p>
      <div
        className={`${
          image === 'car' ? 'block' : 'hidden'
        } absolute -z-10 top-[-92px] pointuserbar:top-[-143px] left-[calc(50%-71px)] pointuserbar:left-[calc(50%-89px)] w-[142px] pointuserbar:w-[178px] h-[159px] pointuserbar:h-[199px] bg-[#E2011A] blur-[150px] supports-[backdrop-filter]:blur-[150px] will-change-transform`}
      ></div>
      <div className={`relative ${className} mx-auto`}>
        <Image src={`/competition/${image}.webp`} alt={title} fill />
      </div>
      <p
        className={`mb-2 pointuserbar:mb-4 text-[30px] font-bold leading-[1.23] text-center bg-gradient-to-b from-[#FFACB5] to-[#E2011A] text-transparent bg-clip-text ${
          image === 'car'
            ? 'pointuserbar:text-[80px]'
            : 'pointuserbar:text-[50px]'
        }`}
      >
        {number}
      </p>
      <h3 className="max-w-[260px] pointuserbar:max-w-[309px] mx-auto mb-3 text-[14px] pointuserbar:text-[20px] mac:text-[25px] font-semibold leading-[1.23] text-center">
        {title}
      </h3>
      <p className="max-w-[260px] pointuserbar:max-w-[195px] mac:max-w-[395px] mx-auto text-[12px] pointuserbar:text-[14px] mac:text-[16px] leading-[1.23] text-center">
        {description}
      </p>
    </li>
  );
}
