'use client';

import { useState, useEffect, useRef } from 'react';
import InpuDataCalculator from '../InpuDataCalculator/InpuDataCalculator';
import TotalAmountCalculator from '../TotalAmountCalculator/TotalAmountCalculator';
import InputDataCalculatorKorea from '../InputDataCalculatorKorea/InputDataCalculatorKorea';
import TotalAmountCalculatorKorea from '../TotalAmountCalculatorKorea/TotalAmountCalculatorKorea';
import CountrySelect, {
  CalculatorCountry,
} from '../CountrySelect/CountrySelect';

import { generatePDF } from '../../PDFTemplate/PDFTemplate';
import useStore from '@/app/zustand/useStore';
import { DownloadPDFPopup } from '../DownloadPDFPopup/DownloadPDFPopup';

type CalculatorBlockProps = {
  country: CalculatorCountry | null;
  onCountryChange: (country: CalculatorCountry) => void;
};

const CalculatorBlock = ({
  country,
  onCountryChange,
}: CalculatorBlockProps) => {
  const [data, setData] = useState({});
  const [isDataGenerated, setIsDataGenerated] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const language = useStore((state) => state.language);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Для Кореї PDF відкриваємо лише коли офіційні платежі пораховані (pdfData є)
    if (isDataGenerated && pdfData && !isPopupOpen) {
      setIsPopupOpen(true);
    }
  }, [isDataGenerated, pdfData, isPopupOpen]);

  useEffect(() => {
    if (!country || !workspaceRef.current) return;

    const timer = window.setTimeout(() => {
      workspaceRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [country]);

  const handleSetIsDataGenerated = (value: boolean) => {
    if (value) {
      setPdfData(null);
    }
    setIsDataGenerated(value);
  };

  const handleGeneratePDF = async () => {
    return await generatePDF({
      data: pdfData,
      language,
      country: country || 'usa',
    });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsDataGenerated(false);
  };

  const handleCountryChange = (nextCountry: CalculatorCountry) => {
    onCountryChange(nextCountry);
    setIsDataGenerated(false);
    setIsPopupOpen(false);
    setData({});
    setPdfData(null);
  };

  return (
    <div className="mobile:pt-[20px] mobile:pb-[20px] tablet:pt-[52px] tablet:pb-[52px] relative">
      <div
        ref={workspaceRef}
        className="max-w-[1696px] mx-auto scroll-mt-[88px]"
      >
        <CountrySelect value={country} onChange={handleCountryChange} />
        {country && (
          <div
            key={country}
            className="flex gap-[32px] justify-center items-center desktop:items-stretch flex-wrap desktop:flex-nowrap mb-[20px]"
          >
            <div className="calculator-slide-left w-full desktop:flex-1 desktop:min-w-0 flex">
              {country === 'korea' ? (
                <InputDataCalculatorKorea
                  setData={setData}
                  setIsDataGenerated={handleSetIsDataGenerated}
                />
              ) : (
                <InpuDataCalculator
                  setData={setData}
                  setIsDataGenerated={handleSetIsDataGenerated}
                />
              )}
            </div>
            <div className="calculator-slide-right w-full desktop:flex-1 desktop:min-w-0 flex">
              {country === 'korea' ? (
                <TotalAmountCalculatorKorea
                  data={data}
                  setPdfData={setPdfData}
                  isDataGenerated={isDataGenerated}
                />
              ) : (
                <TotalAmountCalculator
                  data={data}
                  setPdfData={setPdfData}
                  isDataGenerated={isDataGenerated}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <DownloadPDFPopup
          onGeneratePDF={handleGeneratePDF}
          onClose={handleClosePopup}
        />
      )}
      <style jsx>{`
        .calculator-slide-left {
          animation: slideInFromLeft 1.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .calculator-slide-right {
          animation: slideInFromRight 1.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(calc(-100vw - 40px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(calc(100vw + 40px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CalculatorBlock;
