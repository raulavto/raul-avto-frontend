'use client';
import { useState } from 'react';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calculator.json';

export const DownloadPDFPopup = ({ onGeneratePDF, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [carName, setCarName] = useState('');
  const language = useStore((state) => state.language);
  const t = translations[language];

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onGeneratePDF(carName);
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 1000); // Small delay to show success state
    } catch (error) {
      console.error('PDF generation failed:', error);
      setIsLoading(false);
      // Keep popup open on error so user can try again
    }
  };

  return (
    <div className="transition-opacity duration-500 opacity-0 animate-fadeIn">
      <div className="flex gap-4 tablet:gap-0 justify-between items-center flex-col tablet:flex-row mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:px-[50px] desktop:px-[80px] desktop:py-[40px] w-full bg-gradient-sub-block">
        <div className="flex flex-col gap-4 w-full tablet:w-auto">
          <div className="flex flex-col gap-2 text-center tablet:text-left">
            <h1 className="text-primary text-20 font-semibold">
              {t.saveCalculationTitle}
            </h1>
            <p className="text-12 text-secondary">
              {isLoading
                ? t.generatingPDF || 'Generating PDF...'
                : t.saveCalculationDescription}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-secondary text-16 font-semibold">
              {t.carName || 'Car Name'}
            </label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder={
                t.carNamePlaceholder || 'Enter car name (e.g., Toyota Camry)'
              }
              className="border border-primary rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] px-[20px] text-primary text-18 font-semibold focus:outline-focus outline-none"
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`px-[24px] flex items-center justify-center font-bold w-full tablet:w-auto h-[60px] rounded-sub-block-12 text-18 text-primary transition-all duration-300 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-red hover:opacity-90'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t.generatingPDF || 'Generating...'}</span>
            </div>
          ) : (
            t.saveCalculationButton
          )}
        </button>
      </div>
    </div>
  );
};
