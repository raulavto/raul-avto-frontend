import Container from '@/components/Container/Container';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const LeadFormThanks = () => {
  return (
    <Container>
      <section
        className="flex justify-center items-center tablet:py-[156px] relative bg-[url('/order-fon.jpg')] mobile:bg-no-repeat mobile:bg-center mobile:bg-cover"
        id="order-form"
      >
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="z-10">
          <h2 className="uppercase text-center text-[28px] pointuserbar:text-[48px] font-bold mx-auto mb-12 pointuserbar:mb-[86px] max-w-[300px] pointuserbar:max-w-full text-white">
            Дякуємо!
          </h2>
          <p className="uppercase text-center text-[16px] pointuserbar:text-[24px] text-red-600 font-bold mb-[52px] pointuserbar:mb-[88px]">
            Очікуйте на повідомлення від менеджера
          </p>
          <Link
            href="/"
            className="flex mx-auto max-w-[313px] pointuserbar:max-w-[205px]"
          >
            <Button className="bg-gradient-red w-full h-[60px] pointuserbar:h-[40px] rounded-sub-block-12 text-[14px] text-white font-semibold">
              На головну
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default LeadFormThanks;
