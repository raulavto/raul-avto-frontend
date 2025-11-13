'use client';

import { useState, useEffect } from 'react';
import InpuDataCalculator from '../InpuDataCalculator/InpuDataCalculator';
import TotalAmountCalculator from '../TotalAmountCalculator/TotalAmountCalculator';

import { generatePDF } from '../../PDFTemplate/PDFTemplate';
import useStore from '@/app/zustand/useStore';
import { DownloadPDFPopup } from '../DownloadPDFPopup/DownloadPDFPopup';

const CalculatorBlock = () => {
  const [data, setData] = useState({});
  const [isDataGenerated, setIsDataGenerated] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const language = useStore((state) => state.language);

  useEffect(() => {
    if (isDataGenerated) {
      setIsPopupOpen(true);
    }
  }, [isDataGenerated]);

  const handleGeneratePDF = async (carName?: string) => {
    return await generatePDF({ data: pdfData, language, carName });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsDataGenerated(false);
  };

  return (
    <div className="mobile:pt-[20px] mobile:pb-[20px] tablet:pt-[52px] tablet:pb-[52px] relative">
      <div className="max-w-[1696px] mx-auto">
        <div className="flex gap-[32px] justify-center items-center desktop:items-stretch flex-wrap desktop:flex-nowrap mb-[20px]">
          <InpuDataCalculator
            setData={setData}
            setIsDataGenerated={setIsDataGenerated}
          />
          <TotalAmountCalculator
            data={data}
            setPdfData={setPdfData}
            isDataGenerated={isDataGenerated}
          />
        </div>
      </div>
      {isPopupOpen && (
        <DownloadPDFPopup
          onGeneratePDF={handleGeneratePDF}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default CalculatorBlock;
