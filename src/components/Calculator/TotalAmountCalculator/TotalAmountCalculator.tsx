'use client';
import { useEffect, useState } from 'react';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calcResult.json';
import { getTotalAuctionFee } from '../../../utils/auctionFeeCalculator';
import {
  calculateCustomsTaxes,
  type FuelType,
} from '../../../utils/customsTaxCalculator';
import { getEurExchangeRate, getUsdUahRate } from '../../../utils/minfinApi';

const baseFee = 1800;

const TotalAmountCalculator = ({ data, setPdfData, isDataGenerated }) => {
  console.log('🚀 ~ TotalAmountCalculator ~ data:', data);
  const language = useStore((state) => state.language);
  const t = translations[language];
  const [eurExchangeRate, setEurExchangeRate] = useState<number | null>(null);
  const [usdUahRate, setUsdUahRate] = useState<number | null>(null);
  const {
    auction,
    auctionCost,
    engineCapacity,
    fuelType,
    transportType,
    yearOfManufacture,
    auctionLoc,
    departPort,
    deliveryPort,
    carMake,
    carModel,
  } = data;

  // New auction fee calculation using extracted logic
  const getNewAuctionFee = () => {
    if (!auctionCost || !auction) return 0;
    const auctionType = auction.toLowerCase() === 'copart' ? 'Copart' : 'IAAI';
    return parseFloat(getTotalAuctionFee(auctionType, auctionCost).toFixed(0));
  };

  const auctionFee = getNewAuctionFee() + 300; // base fee of 300

  const auctionTotal = auctionCost * 1 + auctionFee;

  // our fee
  let ourFee = 0;

  if (auctionTotal < 10001 || !auctionTotal) {
    ourFee = 400;
  } else if (auctionTotal > 10000 && auctionTotal < 15001) {
    ourFee = 500;
  } else {
    ourFee = 600;
  }

  // delivery
  let usaDelivery = 150 + auctionLoc * 1;

  // Klaipeda sea freight tariffs (USD): SEDAN / SUV; LARGE = SUV × 1.5
  // Keys match Port columns in towing table (copart.json / iaai.json)
  const klaipedaSeaRates: Record<string, { sedan: number; suv: number }> = {
    NJ: { sedan: 1290, suv: 1402 },
    GA: { sedan: 1290, suv: 1390 },
    FL: { sedan: 1365, suv: 1465 },
    TX: { sedan: 1440, suv: 1540 },
    CA: { sedan: 1790, suv: 1940 },
    WA: { sedan: 1790, suv: 1940 }, // same west-coast band as CA
  };

  let seaDelivery = 0;

  if (deliveryPort === 'kl') {
    const rates = klaipedaSeaRates[departPort];
    if (rates) {
      if (transportType === 'sedan' || transportType === 'motorcycle') {
        seaDelivery = rates.sedan;
      } else if (transportType === 'suv') {
        seaDelivery = rates.suv;
      } else if (transportType === 'mediumSuv') {
        // LARGE / OVERSIZE = SUV tariff × 1.5, rounded to whole USD
        seaDelivery = Math.round(rates.suv * 1.5);
      }
    }
  } else if (deliveryPort === 'bt') {
    if (departPort === 'NJ' || departPort === 'GA') {
      seaDelivery = 1200;
    } else if (departPort === 'CA' || departPort === 'WA') {
      seaDelivery = 1800;
    } else if (departPort === 'TX') {
      seaDelivery = 1500;
    } else if (departPort === 'FL') {
      seaDelivery = 1350;
    }
  } else {
    if (departPort === 'NJ' || departPort === 'GA') {
      seaDelivery = 1925;
    } else if (departPort === 'CA' || departPort === 'WA') {
      seaDelivery = 2625;
    } else if (departPort === 'TX') {
      seaDelivery = 2025;
    } else if (departPort === 'FL') {
      seaDelivery = 1800;
    }
  }

  // Extra fee for all shipments departing from FL
  if (departPort === 'FL' && seaDelivery > 0) {
    seaDelivery += 250;
  }

  // Sea delivery total (+$100 flat surcharge)
  const totalSeaDelivery = seaDelivery * 1 + data.cityCost * 1 + 100;

  let groundDelivery = 0;

  if (deliveryPort === 'kl') {
    groundDelivery = 1050;
  } else if (deliveryPort === 'adesa') {
    groundDelivery = 200;
  }

  const totalDelivery = totalSeaDelivery + groundDelivery * 1;

  // Live rates from Minfin, with fallbacks
  const eurToUsdRate = eurExchangeRate || 1.08;
  const usdToUah = usdUahRate || 41;

  const customs = calculateCustomsTaxes(
    Number(auctionCost) || 0,
    Number(auctionFee) || 0,
    baseFee,
    (fuelType || 'petrol') as FuelType,
    Number(engineCapacity) || 0,
    parseInt(yearOfManufacture, 10) || new Date().getFullYear(),
    eurToUsdRate,
    usdToUah
  );

  const {
    customFees,
    totalCustomsFees,
    pension,
    certification,
  } = customs;

  // Port Complex and Port Parking (in EUR → USD)
  const portComplexEur = 310;
  const portParkingEur = 50;
  const portComplex = Math.ceil(portComplexEur * eurToUsdRate);
  const portParking = Math.ceil(portParkingEur * eurToUsdRate);
  const totalDeliveryWithParking = totalDelivery + portComplex + portParking;

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      const [eurRate, uahRate] = await Promise.all([
        getEurExchangeRate(),
        getUsdUahRate(),
      ]);
      if (eurRate) setEurExchangeRate(eurRate);
      if (uahRate) setUsdUahRate(uahRate);
    };
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (isDataGenerated && data && Object.keys(data).length > 0) {
      setPdfData({
        auctionCost: auctionCost,
        auctionFee: auctionFee,
        ourFee: ourFee,
        deliveryPort: deliveryPort,
        totalSeaDelivery: totalSeaDelivery,
        port_complex: portComplex,
        port_parking: portParking,
        broker: 150,
        groundDelivery: groundDelivery,
        // Without broker — PDF adds broker separately (avoids +$150 double count)
        customFees: customFees,
        certification: certification,
        pension: pension,
        yearOfManufacture: yearOfManufacture,
        carType: transportType,
        fuelType: fuelType,
        engineCapacity: engineCapacity,
        carMake: carMake || '',
        carModel: carModel || '',
      });
    }
  }, [
    isDataGenerated,
    data,
    auctionCost,
    auctionFee,
    ourFee,
    deliveryPort,
    totalSeaDelivery,
    portComplex,
    portParking,
    groundDelivery,
    customFees,
    certification,
    pension,
    yearOfManufacture,
    transportType,
    fuelType,
    engineCapacity,
    carMake,
    carModel,
    setPdfData,
  ]);

  return (
    <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[80px] w-full max-w-none bg-gradient-sub-block self-stretch">
      <ul className="flex flex-col">
        <li className="border-b-[1px] border-solid border-primary">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.total}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {auctionTotal ? auctionTotal : '0'}
            </div>
          </div>
          <ul className="mobile:ml-0 tablet:ml-[72px]">
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.initial_bid}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {auctionCost ? auctionCost : '0'}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.auction_fee}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {auctionFee ? auctionFee : '0'}
              </div>
            </li>
          </ul>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.our_services}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {ourFee ? ourFee : 100}
            </div>
          </div>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.delivery}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {totalDeliveryWithParking ? totalDeliveryWithParking : 0}
            </div>
          </div>

          <ul className="mobile:ml-0 tablet:ml-[72px]">
            {/* <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.portDel}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {data.cityCost ? data.cityCost : 0}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.vehicle_delivery}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {seaDelivery ? seaDelivery : 0}
              </div>
            </li> */}
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.delivery_to_port}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {totalSeaDelivery ? totalSeaDelivery : '0'}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.port_complex}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                € 310
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.port_parking}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                € 50
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.ukrDel}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {groundDelivery ? groundDelivery : 0}
              </div>
            </li>
          </ul>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.customs_clearance}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {totalCustomsFees ? totalCustomsFees : 0}
            </div>
          </div>
          <ul className="mobile:ml-0 tablet:ml-[72px]">
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.broker}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 150
              </div>
            </li>
            {/* <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.official_payments}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 0
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.import_duty}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {importDuty ? importDuty : 0}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.excise_tax}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {exciseTax ? exciseTax : 0}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.vat}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {vat ? vat : 0}
              </div>
            </li> */}
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.custom_fees}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {customFees ? customFees : 0}
              </div>
            </li>
            {/* New Calculation Comparison Fields */}
          </ul>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.registration}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {pension ? certification + pension : 0}
            </div>
          </div>
          <ul className="mobile:ml-0 tablet:ml-[72px]">
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.certification}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {certification}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.pension_fund}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {pension ? pension : 0}
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div className="pt-[24px]">
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-primary text-20 font-semibold">
            {t.total_cost}
          </div>
          <div className="text-primary text-20 font-semibold">
            ${' '}
            {totalCustomsFees
              ? certification +
                pension +
                totalCustomsFees +
                totalDeliveryWithParking +
                ourFee +
                auctionCost * 1 +
                auctionFee
              : 0}
          </div>
        </div>
        <p className="max-w-[380px] -mb-6 text-12 text-secondary">
          {t.disclaimer}
        </p>
        {/* <button className="bg-primary text-white font-semibold py-[10px] px-[24px] rounded-lg">
          {t.more_details}
        </button> */}
      </div>
    </div>
  );
};

export default TotalAmountCalculator;
