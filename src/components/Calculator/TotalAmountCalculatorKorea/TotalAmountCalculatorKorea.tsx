'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import useStore from '@/app/zustand/useStore';
import translations from '@/app/lang/calcResult.json';
import {
  koreaCalculatorConfig as cfg,
  getKoreaDeliveryPickupTotal,
  type KoreaArrivalPort,
} from '@/config/koreaCalculatorConfig';
import {
  convertKoreaCarCostToUsd,
  convertKoreaCustomsFallbackUsd,
  findCustomsBaseValue,
  getKoreaOurServicesFee,
  type KoreaCustomsTables,
} from '@/utils/koreaCustomsTable';
import { calculateKoreaOfficialPayments } from '@/utils/koreaCalculator';
import { getEurExchangeRate, getUsdUahRate } from '@/utils/minfinApi';
import type { FuelType } from '@/utils/customsTaxCalculator';

type KoreaInputData = {
  carMake?: string;
  carModel?: string;
  currency?: 'KRW' | 'USD';
  carCost?: number | string;
  fuelType?: FuelType;
  engineCapacity?: number | string;
  yearOfManufacture?: string | number;
  arrivalPort?: KoreaArrivalPort;
  isDamaged?: boolean;
};

type Props = {
  data: KoreaInputData;
  setPdfData: (data: Record<string, unknown> | null) => void;
  isDataGenerated: boolean;
};

const formatUsd = (value: number) =>
  Number.isFinite(value) ? Math.round(value).toLocaleString('en-US') : '0';

const Line = ({ label, value }: { label: string; value: number }) => (
  <li className="flex items-center justify-between">
    <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
      {label}
    </div>
    <div className="flex-grow mx-[16px] h-[1px] bg-primary" />
    <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold whitespace-nowrap">
      $ {formatUsd(value)}
    </div>
  </li>
);

const Section = ({
  title,
  total,
  children,
}: {
  title: string;
  total: number;
  children?: ReactNode;
}) => (
  <li className="border-b-[1px] border-solid border-primary pt-4 first:pt-0">
    <div className="flex justify-between items-center">
      <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
        {title}
      </div>
      <div className="mobile:text-14 tablet:text-18 text-primary font-semibold whitespace-nowrap">
        $ {formatUsd(total)}
      </div>
    </div>
    {children ? (
      <ul className="mobile:ml-0 tablet:ml-[72px]">{children}</ul>
    ) : null}
  </li>
);

const TotalAmountCalculatorKorea = ({
  data,
  setPdfData,
  isDataGenerated,
}: Props) => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  const [eurExchangeRate, setEurExchangeRate] = useState<number | null>(null);
  const [usdUahRate, setUsdUahRate] = useState<number | null>(null);
  const [customsTables, setCustomsTables] =
    useState<KoreaCustomsTables | null>(null);

  const hasData = Boolean(data && Object.keys(data).length > 0);

  const {
    carMake = '',
    carModel = '',
    currency = 'USD',
    carCost = 0,
    fuelType = 'petrol',
    engineCapacity = 0,
    yearOfManufacture = new Date().getFullYear(),
    arrivalPort = 'odesa',
    isDamaged = false,
  } = data || {};

  const year =
    parseInt(String(yearOfManufacture), 10) || new Date().getFullYear();
  const engine = Number(engineCapacity) || 0;
  const rawCost = Number(carCost) || 0;

  const carCostUsd = hasData
    ? convertKoreaCarCostToUsd(
        rawCost,
        currency,
        cfg.hiddenTaxKrw,
        cfg.krwToUsdRate
      )
    : 0;

  const ourFee = hasData
    ? getKoreaOurServicesFee(carCostUsd, cfg.ourServices)
    : 0;

  const eurToUsdRate = eurExchangeRate || 1.08;
  const usdToUah = usdUahRate || 41;

  const customsLookup = useMemo(() => {
    if (!hasData) return null;
    return findCustomsBaseValue(
      carMake,
      carModel,
      (fuelType || 'petrol') as FuelType,
      year,
      eurToUsdRate,
      customsTables,
      arrivalPort,
      isDamaged
    );
  }, [
    hasData,
    carMake,
    carModel,
    fuelType,
    year,
    eurToUsdRate,
    customsTables,
    arrivalPort,
    isDamaged,
  ]);

  // Немає в таблицях (ціла і бита): (KRW + 440000) / 1440 + 1600$.
  const customsFallbackUsd = convertKoreaCustomsFallbackUsd(
    rawCost,
    currency,
    cfg.hiddenTaxKrw,
    cfg.krwToUsdRate,
    cfg.customsFallbackUsdAdd
  );
  const customsBaseUsd =
    customsLookup?.valueUsd ??
    (customsTables ? customsFallbackUsd : carCostUsd);
  // Офіційні платежі рахуємо завжди (навіть якщо Sheets ще/не завантажились).
  const official = hasData
    ? calculateKoreaOfficialPayments(
        customsBaseUsd,
        (fuelType || 'petrol') as FuelType,
        engine,
        year,
        eurToUsdRate,
        usdToUah
      )
    : null;

  const inspection = hasData ? cfg.inspection : 0;
  const deliveryEurope = hasData ? cfg.deliveryToEuropePort : 0;
  const loadingExport = hasData ? cfg.loadingAndExportDocs : 0;
  const portComplex = hasData ? cfg.portComplex : 0;
  const broker = hasData ? cfg.broker : 0;
  const deliveryPickup = hasData
    ? getKoreaDeliveryPickupTotal(arrivalPort)
    : 0;
  const certification = hasData ? cfg.certification : 0;
  const customFees = official?.customFees || 0;
  const pension = official?.pension || 0;

  const stage1 = inspection;
  const stage2 = carCostUsd + ourFee + deliveryEurope + loadingExport;
  const stage3 = customFees;
  const stage4 = portComplex + broker + deliveryPickup + certification;
  const stage5 = pension;
  const grandTotal = stage1 + stage2 + stage3 + stage4 + stage5;

  // Групи для UI (у стилі калькулятора США)
  const purchaseTotal = Math.round(carCostUsd) + inspection;
  const deliveryTotal =
    deliveryEurope + loadingExport + portComplex + deliveryPickup;
  const customsTotal = customFees + broker;
  const registrationTotal = certification + pension;

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
    let cancelled = false;
    const loadCustomsTables = async () => {
      try {
        const response = await fetch('/api/korea-customs-table');
        if (!response.ok) return;
        const json = await response.json();
        if (cancelled) return;
        if (
          Array.isArray(json.wholeStandard) ||
          Array.isArray(json.wholeFallback) ||
          Array.isArray(json.damaged) ||
          Array.isArray(json.extra)
        ) {
          setCustomsTables({
            wholeStandard: json.wholeStandard || [],
            wholeFallback: json.wholeFallback || [],
            damaged: json.damaged || [],
            extra: json.extra || [],
          });
        }
      } catch (error) {
        console.error('Failed to load Korea customs tables:', error);
      }
    };
    loadCustomsTables();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isDataGenerated || !hasData) {
      return;
    }

    setPdfData({
      country: 'korea',
      carMake,
      carModel,
      yearOfManufacture: year,
      fuelType,
      engineCapacity: engine,
      arrivalPort,
      isDamaged,
      carCostUsd: Math.round(carCostUsd),
      ourFee,
      inspection,
      deliveryEurope,
      loadingExport,
      customFees,
      portComplex,
      broker,
      deliveryPickup,
      certification,
      pension,
      totalAmount: Math.round(grandTotal),
    });
  }, [
    isDataGenerated,
    hasData,
    carMake,
    carModel,
    year,
    fuelType,
    engine,
    arrivalPort,
    isDamaged,
    carCostUsd,
    ourFee,
    inspection,
    deliveryEurope,
    loadingExport,
    customFees,
    portComplex,
    broker,
    deliveryPickup,
    certification,
    pension,
    grandTotal,
    setPdfData,
  ]);

  return (
    <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[80px] w-full max-w-none bg-gradient-sub-block self-stretch">
      <ul className="flex flex-col">
        <Section title={t.korea_purchase} total={purchaseTotal}>
          <Line label={t.korea_car_cost} value={Math.round(carCostUsd)} />
          <Line label={t.korea_inspection} value={inspection} />
        </Section>

        <Section title={t.our_services} total={ourFee} />

        <Section title={t.delivery} total={deliveryTotal}>
          <Line label={t.korea_delivery_europe} value={deliveryEurope} />
          <Line label={t.korea_loading_export} value={loadingExport} />
          <Line label={t.korea_port_complex} value={portComplex} />
          <Line label={t.korea_delivery_pickup} value={deliveryPickup} />
        </Section>

        <Section title={t.customs_clearance} total={customsTotal}>
          <Line label={t.broker} value={broker} />
          <Line label={t.custom_fees} value={customFees} />
        </Section>

        <Section title={t.registration} total={registrationTotal}>
          <Line label={t.certification} value={certification} />
          <Line label={t.pension_fund} value={pension} />
        </Section>
      </ul>

      <div className="pt-[24px]">
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-primary text-20 font-semibold">
            {t.total_cost}
          </div>
          <div className="text-primary text-20 font-semibold">
            $ {formatUsd(grandTotal)}
          </div>
        </div>
        <p className="max-w-[380px] text-12 text-secondary">
          {t.disclaimer}
        </p>
        {hasData && customsTables && !customsLookup ? (
          <p className="max-w-[380px] mt-2 -mb-6 text-12 text-red-500">
            {t.korea_not_in_tables}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default TotalAmountCalculatorKorea;
