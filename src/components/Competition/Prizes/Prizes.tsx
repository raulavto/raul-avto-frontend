import PrizesList from './PrizesList';

export default function Prizes() {
  return (
    <section className=" pt-6 pb-[79px] pointuserbar:pt-[66px] pointuserbar:pb-[112px]">
      <div className="container xl:max-w-[1440px]">
        <h2 className="relative z-20 mb-[55px] pointuserbar:mb-[135px] text-[25px] pointuserbar:text-[48px] font-bold leading-[1.23] uppercase text-[#F2EEEE] text-center">
          Призи, які чекають на тебе!
        </h2>
        <PrizesList />
      </div>
    </section>
  );
}
