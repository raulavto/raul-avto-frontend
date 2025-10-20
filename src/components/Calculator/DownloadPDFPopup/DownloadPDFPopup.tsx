'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calculator.json';

export const DownloadPDFPopup = ({ onGeneratePDF, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const language = useStore((state) => state.language);
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onGeneratePDF();
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

  const popupContent = (
    <div className="fixed bottom-[100px] tablet:bottom-[160px] left-0 right-0 z-[9999] transition-opacity duration-500 opacity-0 animate-fadeIn px-4">
      <div className="max-w-[1696px] mx-auto">
        <div className="flex gap-4 tablet:gap-0 justify-between items-center flex-col tablet:flex-row mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:px-[50px] desktop:px-[80px] desktop:py-[40px] w-full bg-gradient-sub-block">
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
    </div>
  );

  if (!mounted) return null;

  return createPortal(popupContent, document.body);
};
