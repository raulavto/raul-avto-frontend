import Timer from '@/components/UI/Timer/TimerComponent';

const TimerBlock = () => {
  return (
    <section className="pb-20 poinuserbar:pb-[226px] mx-auto flex flex-col items-center gap-4 tabletplus:gap-6">
      <h2 className="text-[#F2EEEE] font-bold uppercase text-[20px] pretablet:text-[32px] pointuserbar:text-[48px] leading-[1.23] text-center">
        Встигни <br className="mobileplus:hidden" /> доєднатися!
      </h2>
      <p className="text-[#F7F5F5] text-[16px] font-medium tabletplus:mb-2 tablet:text-[24px]">
        До кінця конкурсу:
      </p>
      <div className="w-[72.5%] pretablet:w-[408px]">
        <Timer targetDate="2025-04-01T12:00:00" />
      </div>
    </section>
  );
};

export default TimerBlock;
