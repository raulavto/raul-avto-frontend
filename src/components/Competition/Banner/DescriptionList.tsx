import Image from 'next/image';
import { data } from './data';

const DescriptionList = () => {
  return (
    <ul className="grid grid-cols-2 gap-x-1 mobileplus:gap-x-6 gap-y-3 text-[#F2EEEE] font-medium mx-6  pointuserbar:grid-cols-[repeat(4,minmax(0,auto))] pointuserbar:mx-auto max-w-[1280px] mac:gap-[14px] justify-between mobileplus:justify-center">
      {data.map(({ icon, title, descr }, index) => (
        <li
          key={index}
          className="flex items-center gap-[5px] justify-between rounded-[10px] bg-[#e1ffe11c] h-[60px] px-[10px] tablet:h-[90px] tablet:justify-start tablet:gap-[42px] pointuserbar:gap-5 mac:gap-[42px] tablet:px-4 mac:pr-[50px] mac:pl-7 mac:w-fit "
        >
          <Image
            src={icon}
            alt={title}
            width={20}
            height={20}
            className="mobileplus:w-10 mobileplus:h-10"
          />
          <div className="flex flex-col  justify-between gap-[7px] ">
            <p className="text-[12px] pretablet:text-[20px] pointuserbar:text-[16px] mac:text-[20px] leading-[1.23] mac:whitespace-nowrap">
              {title}
            </p>
            <p className="hidden text-[16px] whitespace-nowrap tablet:block">
              {descr}
            </p>
          </div>
          <p className="text-[8px] whitespace-nowrap tablet:hidden">{descr}</p>
        </li>
      ))}
    </ul>
  );
};

export default DescriptionList;
