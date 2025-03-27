import Link from 'next/link';

import Button from '@/components/UI/Button/Button';
import Timer from '@/components/UI/Timer/TimerComponent';
import ImageBlock from './ImageBlock';

const CompetitionBlock = () => {
  return (
    <section className="py-[100px] tabletplus:py-[200px] relative max-w-[1360px] ml-auto pl-2  wide:mx-auto">
      <div className="grid grid-cols-[1fr_auto] pretablet:grid-cols-[43%_54.1%] gap-5 tabletplus:gap-9 items-stretch justify-between w-full relative overflow-clip">
        <div className="pt-[20px] pretablet:py-[102px]">
          <h2 className="text-[#F2EEEE] text-[24px] tabletplus:text-[32px] pointuserbar:text-[38px] mac:text-[50px] mb-5 tabletplus:mb-6 font-bold uppercase leading-[1.2]">
            Вигравай Audi&nbsp;A8
            <br /> всього за 200&nbsp;грн!
          </h2>
          <p className="text-[#F7F5F5] text-[12px] pointuserbar:text-[20px] w-[56%] pretablet:w-[90%] mb-[66px] pretablet:mb-[70px]">
            Виграй Audi A8 2014!
            <br /> Ця красуня з червоним бантом може бути твоєю! Долучайся до
            конкурсу!
          </p>

          <div className="hidden pretablet:block w-[80%] max-w-[416px]">
            <p className="text-white mb-7 text-[16px] tabletplus:text-[25px] font-bold">
              Дата старту: 29.03.2025
            </p>
            <Timer />
            <Link href="/competition" className="mt-10 w-full flex h-[75px]">
              <Button className="w-full h-full rounded-sub-block-12 bg-gradient-red text-[14px] text-white hover:bg-red-800">
                Дізнатися деталі
              </Button>
            </Link>
          </div>
        </div>

        <ImageBlock />
      </div>
      <div className="pretablet:hidden  flex flex-col items-center pr-2 mt-[-24px]">
        <Link
          href="/competition"
          className="mb-6 w-full flex max-w-[313px] h-[48px] justify-center"
        >
          <Button className="w-full rounded-sub-block-12 bg-gradient-red text-[14px] text-white h-full hover:bg-red-800">
            Дізнатися деталі
          </Button>
        </Link>

        <p className="text-white mb-7 text-[16px] font-bold">
          Дата старту: 29.03.2025
        </p>
        <div className="max-w-[222px]">
          <Timer />
        </div>
      </div>
    </section>
  );
};

export default CompetitionBlock;
