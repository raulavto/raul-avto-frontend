'use client';
import Button from '@/components/UI/Button/Button';
import { useAppSelector } from '@/hooks/redux-hook';
import { usePathname, useRouter } from 'next/navigation';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/buttonFeedback.json';

const HIDDEN_WIDGET_PATHS = [
  '/calculator',
  '/lead-form',
  '/lead-form-thanks',
];

const ButtonFeedback = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isModalOpen = useAppSelector(
    (state) => state.feedbackForm.isModalFeedbackOpen
  );
  const language = useStore((state) => state.language);
  const t = translations[language];

  const isHidden = HIDDEN_WIDGET_PATHS.includes(pathname);

  const handleClick = () => {
    router.push('/#order-form');
  };

  if (isHidden || isModalOpen) return null;

  return (
    <div className="fixed z-[200] mobile:bottom-[20px] mobile:left-5 tablet:bottom-[50px] tablet:left-10 ">
      <Button
        className="mobile:bg-white mobile:w-[60px] mobile:h-[60px] tablet:w-[126px] tablet:h-[126px] rounded-full text-red-600 mobile:text-[8px] tablet:text-[15px] font-bold uppercase transform transition duration-300 ease-in-out hover:scale-105 hover:text-gray-700"
        onClick={handleClick}
      >
        {t.button_label}
      </Button>
    </div>
  );
};

export default ButtonFeedback;
