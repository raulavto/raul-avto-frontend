'use client';
import Button from '@/components/UI/Button/Button';
import { /*useAppDispatch,*/ useAppSelector } from '@/hooks/redux-hook';
// import { openModalFeedback } from '@/Redux/feedbackFormSlice/feedbackFormSlice';
import { usePathname, useRouter } from 'next/navigation';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/buttonFeedback.json';

const ButtonFeedback = () => {
  const pathname = usePathname();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.feedbackForm.isModalFeedbackOpen
  );
  const language = useStore((state) => state.language);
  const t = translations[language];

  const isLeadForm = pathname === '/lead-form' || pathname === '/lead-form-thanks';

  const handleClick = () => {
    // dispatch(openModalFeedback());
    router.push('/#order-form');
  };
  return (!isLeadForm&&
    !isModalOpen && (
      <div className="fixed z-[200] mobile:bottom-[20px] mobile:left-5 tablet:bottom-[50px] tablet:left-10 ">
        <Button
          className="mobile:bg-white mobile:w-[60px] mobile:h-[60px] tablet:w-[126px] tablet:h-[126px] rounded-full text-red-600 mobile:text-[8px] tablet:text-[15px] font-bold uppercase transform transition duration-300 ease-in-out hover:scale-105 hover:text-gray-700"
          onClick={handleClick}
        >
          {t.button_label}
        </Button>
      </div>
    )
  );
};

export default ButtonFeedback;
