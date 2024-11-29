"use client"
import UserContactsForm from '@/components/Forms/UserContactsForm/UserContactsForm';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/partnership.json';

const HeroPartnership = () => {
  const language = useStore(state => state.language);
  const t = translations[language];

  return (
    <div className="mobile:pt-[30px] mobile:pb-[30px] tablet:pt-[80px] tablet-[pb-80px] desktop:pt-[120px] desktop:pb-[120px]">
      <div className="flex gap-[80px] mobile:flex-wrap mobile:items-center mobile:justify-center desktop:flex-nowrap">
        <div className="flex flex-col mobile:items-center mobile:justify-center desktop:items-start desktop:justify-center">
          <h1 className="max-w-[960px] mobile:text-center desktop:text-left mobile:text-[24px] tablet:text-[40px] desktop:text-[44px] text-left text-primary mb-[56px] font-bold">
            {t.title_part1}{' '}
            <span className="bg-gradient-red bg-clip-text text-transparent">
              {t.highlight}
            </span>{' '}
            <span className="block">{t.title_part3}</span>
          </h1>
          <p className="max-w-[838px] font-medium text-[21px] mobile:text-center desktop:text-left text-secondary mb-[32px]">
            {t.description1}
          </p>
          <p className="max-w-[838px] font-medium text-[21px] mobile:text-center desktop:text-left text-secondary">
            {t.description2}
          </p>
        </div>
        <div>
          <UserContactsForm />
        </div>
      </div>
    </div>
  );
};

export default HeroPartnership;
