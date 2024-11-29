'use client';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/emptyList.json';

const EmptyMessage = ({ message = `Hічого не знайдено` }) => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <div className="relative z-[200] flex flex-col items-center justify-center p-[40px] bg-gray-600 rounded-lg shadow-md text-center">
      <p className="text-gray-200 text-lg font-semibold">
        {t.not_found || message}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mt-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
    </div>
  );
};

export default EmptyMessage;
