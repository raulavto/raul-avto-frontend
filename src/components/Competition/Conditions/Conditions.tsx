import Container from '@/components/Container/Container';
import ConditionsList from './ConditionsList';

export default function Conditions() {
  return (
    <section className="pt-6 pb-4 pointuserbar:pt-[38px] pointuserbar:pb-[42px] mx-auto overflow-x-hidden">
      <div className="container xl:max-w-[1440px]">
        <h2 className="mb-6 pointuserbar:mb-[44px] text-[25px] pointuserbar:text-[48px] font-bold leading-[1.23] uppercase text-[#F2EEEE] text-center">
          Умови Конкурсу
        </h2>
        <ConditionsList />
        <p className="max-w-[430px] pointuserbar:max-w-[736px] mt-[47px] mx-auto text-[12px] pointuserbar:text-[20px] font-semibold text-white text-center leading-[1.23]">
          Частина зібраних коштів піде на дитячий будинок-інтернат у місті Київ
          для дітей з дефектами фізичного та розумового розвитку. Разом даруємо
          надію!
        </p>
      </div>
    </section>
  );
}
