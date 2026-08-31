'use client';

import CustomSelect from '@/components/UI/CustomSelect/CustomSelect';
import Button from '@/components/UI/Button/Button';
import { useMemo, useState, type ChangeEvent } from 'react';
import useStore from '@/app/zustand/useStore';
import translations from '@/app/lang/calculator.json';
import carBrandsModels from '@/data/carBrandsModels.json';
import {
  amountCursorAfterDigits,
  formatAmountInput,
  parseAmountInput,
} from '@/utils/formatAmountInput';
import type { KoreaArrivalPort } from '@/config/koreaCalculatorConfig';

type KoreaCurrency = 'KRW' | 'USD';

type FormState = {
  carMake: string;
  carModel: string;
  currency: KoreaCurrency;
  carCost: string;
  fuelType: string;
  engineCapacity: string;
  yearOfManufacture: string;
  arrivalPort: KoreaArrivalPort;
  isDamaged: boolean;
};

type Props = {
  setData: (data: Record<string, unknown>) => void;
  setIsDataGenerated: (value: boolean) => void;
};

const InputDataCalculatorKorea = ({ setData, setIsDataGenerated }: Props) => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  const [formData, setFormData] = useState<FormState>({
    carMake: '',
    carModel: '',
    currency: 'USD',
    carCost: '',
    fuelType: 'petrol',
    engineCapacity: '',
    yearOfManufacture: '2023',
    arrivalPort: 'odesa',
    isDamaged: false,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const makeOptions = useMemo(
    () =>
      Object.keys(carBrandsModels).map((make) => ({
        label: make,
        value: make,
      })),
    []
  );

  const modelOptions = useMemo(() => {
    if (!formData.carMake || !carBrandsModels[formData.carMake]) {
      return [];
    }
    return carBrandsModels[formData.carMake].map((model: string) => ({
      label: model,
      value: model,
    }));
  }, [formData.carMake]);

  const yearOptions = useMemo(
    () =>
      Array.from({ length: 2026 - 2006 + 1 }, (_, i) => {
        const year = 2026 - i;
        return { label: `${year}`, value: `${year}` };
      }),
    []
  );

  if (!t) {
    throw new Error(`Translations for language "${language}" not found.`);
  }

  const engineCapacityLabel =
    formData.fuelType === 'electric'
      ? t.engineCapacityElectro
      : t.engineCapacity;

  const costLabel =
    formData.currency === 'KRW' ? t.koreaCarCostKrw : t.koreaCarCostUsd;

  const fields = [
    {
      key: 'carMake',
      label: t.carMake,
      type: 'select' as const,
      searchable: true,
      placeholder: t.selectMake,
      searchPlaceholder: t.searchMake,
      options: makeOptions,
    },
    {
      key: 'carModel',
      label: t.carModel,
      type: 'select' as const,
      searchable: true,
      disabled: !formData.carMake,
      placeholder: formData.carMake ? t.selectModel : t.selectMakeFirst,
      searchPlaceholder: t.searchModel,
      options: modelOptions,
    },
    {
      key: 'currency',
      label: t.koreaCurrency,
      type: 'select' as const,
      options: [
        { label: t.koreaCurrencyUsd, value: 'USD' },
        { label: t.koreaCurrencyKrw, value: 'KRW' },
      ],
    },
    {
      key: 'carCost',
      label: costLabel,
      type: 'input' as const,
      placeholder: formData.currency === 'KRW' ? '16 000 000' : '12 000',
      formatAmount: true,
    },
    {
      key: 'fuelType',
      label: t.fuelType,
      type: 'select' as const,
      options: [
        { label: t.options.fuelOptions.petrol, value: 'petrol' },
        { label: t.options.fuelOptions.diesel, value: 'diesel' },
        { label: t.options.fuelOptions.hybrid, value: 'hybrid' },
        { label: t.options.fuelOptions.electric, value: 'electric' },
      ],
    },
    {
      key: 'engineCapacity',
      label: engineCapacityLabel,
      type: 'input' as const,
      placeholder: formData.fuelType === 'electric' ? '64' : '2000',
    },
    {
      key: 'yearOfManufacture',
      label: t.yearOfManufacture,
      type: 'select' as const,
      options: yearOptions,
    },
    {
      key: 'arrivalPort',
      label: t.koreaArrivalPort,
      type: 'select' as const,
      options: [
        { label: t.koreaArrivalPortKlaipeda, value: 'klaipeda' },
        { label: t.koreaArrivalPortConstanta, value: 'constanta' },
        { label: t.koreaArrivalPortOdesa, value: 'odesa' },
      ],
    },
  ];

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => {
      if (key === 'carMake') {
        return { ...prev, carMake: value, carModel: '' };
      }
      return { ...prev, [key]: value };
    });

    setErrors((prev) => ({
      ...prev,
      [key]: !value,
      ...(key === 'carMake' ? { carModel: true } : {}),
    }));
  };

  const handleAmountChange = (
    key: keyof FormState,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;
    const cursor = input.selectionStart ?? input.value.length;
    const digitsBeforeCursor = input.value
      .slice(0, cursor)
      .replace(/\D/g, '').length;
    const formatted = formatAmountInput(input.value);

    handleChange(key, formatted);

    requestAnimationFrame(() => {
      const pos = amountCursorAfterDigits(formatted, digitsBeforeCursor);
      input.setSelectionRange(pos, pos);
    });
  };

  const handleSubmit = () => {
    const requiredKeys: (keyof FormState)[] = [
      'carMake',
      'carModel',
      'currency',
      'carCost',
      'fuelType',
      'engineCapacity',
      'yearOfManufacture',
      'arrivalPort',
    ];

    const newErrors = requiredKeys.reduce<Record<string, boolean>>((acc, key) => {
      if (!formData[key]) acc[key] = true;
      return acc;
    }, {});

    const numericCost = parseAmountInput(formData.carCost);
    if (!numericCost || numericCost <= 0) {
      newErrors.carCost = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setData({
        ...formData,
        carCost: numericCost,
        country: 'korea',
      });
      setIsDataGenerated(true);
    }
  };

  return (
    <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[40px] desktop:p-[80px] w-full bg-gradient-sub-block self-stretch">
      <h2 className="text-primary mobile:text-28 tablet:text-40 font-bold mb-[72px] text-center">
        {t.inputData}
      </h2>
      <ul className="grid grid-cols-1 tablet:grid-cols-2 gap-6 justify-items-center">
        {fields.map((item) => (
          <li key={item.key} className="w-full flex flex-col space-y-2">
            {item.type === 'input' ? (
              <>
                <label className="text-secondary text-16 font-medium truncate">
                  {item.label}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={item.placeholder}
                  value={formData[item.key as keyof FormState] || ''}
                  onChange={(e) =>
                    item.formatAmount
                      ? handleAmountChange(item.key as keyof FormState, e)
                      : handleChange(item.key, e.target.value)
                  }
                  className={`border box-border ${
                    errors[item.key] ? 'border-red-500' : 'border-primary'
                  } rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] px-[20px] text-primary text-16 font-semibold focus:outline-focus outline-none`}
                />
              </>
            ) : (
              <CustomSelect
                currentSelectedOption={
                  formData[item.key as keyof FormState]
                    ? item.options?.find(
                        (o) => o.value === formData[item.key as keyof FormState]
                      )?.label || String(formData[item.key as keyof FormState])
                    : item.placeholder ||
                      (item.options && item.options[0]?.label) ||
                      ''
                }
                label={item.label}
                options={item.options || []}
                containerClassName="w-full flex-1"
                labelClassName="text-secondary text-16 font-medium truncate"
                selectClassName={`border box-border ${
                  errors[item.key] ? 'border-red-500' : 'border-primary'
                } rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] pl-[20px] pr-[10px] text-primary text-16 font-semibold`}
                optionClassName="text-primary w-full"
                optionListClassName="max-h-[220px]"
                onSelect={(option) => handleChange(item.key, option.value)}
                isSearchable={Boolean(item.searchable)}
                disabled={Boolean(item.disabled)}
                searchPlaceholder={item.searchPlaceholder}
              />
            )}
          </li>
        ))}
        <li className="w-full tablet:col-span-2 flex flex-col items-center">
          <label className="h-[60px] flex items-center justify-center gap-4 cursor-pointer select-none">
            <span
              className={`text-16 font-semibold transition-colors ${
                !formData.isDamaged ? 'text-primary' : 'text-secondary'
              }`}
            >
              {t.koreaCarWhole}
            </span>
            <input
              type="checkbox"
              checked={formData.isDamaged}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  isDamaged: event.target.checked,
                }))
              }
              className="sr-only peer"
            />
            <span className="relative h-[28px] w-[52px] rounded-full bg-[#3a3d43] peer-checked:bg-red-600 transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-[22px] after:w-[22px] after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-[24px]" />
            <span
              className={`text-16 font-semibold transition-colors ${
                formData.isDamaged ? 'text-primary' : 'text-secondary'
              }`}
            >
              {t.koreaCarDamaged}
            </span>
          </label>
        </li>
        <li className="self-end w-full tablet:col-span-2">
          <Button
            className="flex items-center justify-center bg-gradient-red font-bold w-full h-[60px] rounded-sub-block-12 text-18 text-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {t.calculatePayments}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default InputDataCalculatorKorea;
