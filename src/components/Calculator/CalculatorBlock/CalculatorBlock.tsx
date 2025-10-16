'use client';

import { useState } from 'react';
import InpuDataCalculator from '../InpuDataCalculator/InpuDataCalculator';
import TotalAmountCalculator from '../TotalAmountCalculator/TotalAmountCalculator';

import { createPDFDocument } from '../../PDFTemplate/PDFTemplate';
import useStore from '@/app/zustand/useStore';

const CalculatorBlock = () => {
  const [data, setData] = useState({});
  const language = useStore((state) => state.language);

  const dataForPDF = {
    auctionCost: 10000,
    auctionFee: 1000,
    ourFee: 1000,
    deliveryPort: 'kl',
    totalSeaDelivery: 1000,
    port_complex: 360,
    port_parking: 60,
    broker: 150,
    groundDelivery: 1000,
    customFees: 1000,
    certification: 150,
    pension: 1000,
  };

  const generatePDF = (data: any) => {
    createPDFDocument({ data, language });
  };

  return (
    <div className="mobile:pt-[20px] mobile:pb-[20px] tablet:pt-[52px] tablet:pb-[52px]">
      <div className="max-w-[1696px] mx-auto">
        <div className="flex gap-[32px] justify-center items-center flex-wrap desktop:flex-nowrap">
          <InpuDataCalculator setData={setData} />
          <TotalAmountCalculator data={data} />
          <button
            onClick={() => generatePDF(dataForPDF)}
            className="text-white"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBlock;
