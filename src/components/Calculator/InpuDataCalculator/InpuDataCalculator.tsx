'use client';
import CustomSelect from '@/components/UI/CustomSelect/CustomSelect';
import Button from '@/components/UI/Button/Button';
import { useEffect, useMemo, useState } from 'react';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calculator.json';
import carBrandsModels from '../../../data/carBrandsModels.json';
import {
  amountCursorAfterDigits,
  formatAmountInput,
  parseAmountInput,
} from '@/utils/formatAmountInput';

const InpuDataCalculator = ({ setData, setIsDataGenerated }) => {
  const language = useStore((state) => state.language);

  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    auctionCost: '',
    transportType: 'sedan',
    fuelType: 'petrol',
    engineCapacity: '',
    yearOfManufacture: '2023',
    auction: 'copart',
    auctionLoc: '',
    departPort: '',
    deliveryPort: 'kl',
    cityCost: null,
  });

  const [errors, setErrors] = useState({});
  const [auctionLocOptions, setAuctionLocOptions] = useState([]);
  const [departPorts, setDepartPorts] = useState([]);

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
    return carBrandsModels[formData.carMake].map((model) => ({
      label: model,
      value: model,
    }));
  }, [formData.carMake]);

  const fetchAuctionData = async (selectedAuction: string) => {
    try {
      const response = await fetch(
        `/api/getSheetData?auction=${selectedAuction}`
      );
      const data = await response.json();

      if (!data || !data.data) {
        console.error('Невірні дані отримано з API');
        return;
      }

      const locations = data.data
        .map((row: any, rowIndex: number) => {
          if (rowIndex === 0) return null;

          const cityState = row[0];
          const departOptions = [];

          for (let i = 1; i < row.length; i++) {
            const stateValue = row[i];
            if (stateValue !== '-' && !isNaN(stateValue)) {
              const stateName = data.data[1][i];
              if (stateName) {
                departOptions.push({
                  label: `${stateName.trim()}`,
                  value: parseInt(stateValue, 10),
                });
              }
            }
          }

          if (departOptions.length > 0) {
            return {
              label: cityState,
              value: cityState,
              departOptions,
            };
          }

          return null;
        })
        .filter(Boolean);

      setAuctionLocOptions(locations);

      if (locations.length > 0 && !formData.auctionLoc) {
        setFormData((prevState) => ({
          ...prevState,
          auctionLoc: locations[0].value,
          departPort: locations[0].departOptions[0]?.label || '',
        }));
      }
    } catch (error) {
      console.error('Помилка отримання даних:', error);
    }
  };

  useEffect(() => {
    const updateAuctionData = async () => {
      await fetchAuctionData(formData.auction);
    };

    updateAuctionData();
  }, [formData.auction]);

  useEffect(() => {
    if (formData.auction && auctionLocOptions.length > 0) {
      const firstLocation = auctionLocOptions[0];
      setFormData((prevState) => ({
        ...prevState,
        auctionLoc: firstLocation.value,
        departPort: firstLocation.departOptions[0]?.label || '',
      }));
    }
  }, [formData.auction, auctionLocOptions]);

  useEffect(() => {
    const selectedLocation = auctionLocOptions.find(
      (loc) => loc.value === formData.auctionLoc
    );

    if (selectedLocation) {
      setDepartPorts(selectedLocation.departOptions);

      if (selectedLocation.departOptions.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          departPort: selectedLocation.departOptions[0].label,
        }));
      }
    } else {
      setDepartPorts([]);
    }
  }, [formData.auctionLoc, auctionLocOptions]);

  if (!translations[language]) {
    throw new Error(`Translations for language "${language}" not found.`);
  }

  const {
    inputData,
    calculatePayments,
    auctionCost,
    carMake,
    carModel,
    selectMake,
    selectModel,
    selectMakeFirst,
    searchMake,
    searchModel,
    transportType,
    fuelType,
    engineCapacity,
    yearOfManufacture,
    auction,
    options,
    auctionLoc,
    deliveryPort,
    departPort,
  } = translations[language];

  const engineCapacityLabel =
    formData.fuelType === 'electric'
      ? translations[language].engineCapacityElectro
      : translations[language].engineCapacity;

  const fields = [
    {
      key: 'carMake',
      label: carMake,
      type: 'select',
      searchable: true,
      placeholder: selectMake,
      searchPlaceholder: searchMake,
      options: makeOptions,
    },
    {
      key: 'carModel',
      label: carModel,
      type: 'select',
      searchable: true,
      disabled: !formData.carMake,
      placeholder: formData.carMake ? selectModel : selectMakeFirst,
      searchPlaceholder: searchModel,
      options: modelOptions,
    },
    {
      key: 'auctionCost',
      label: auctionCost,
      type: 'input',
      placeholder: '2 000',
      formatAmount: true,
    },
    {
      key: 'transportType',
      label: transportType,
      type: 'select',
      options: [
        { label: options.sedan, value: 'sedan' },
        { label: options.suv, value: 'suv' },
        { label: options.mediumSuv, value: 'mediumSuv' },
        { label: options.motorcycle, value: 'motorcycle' },
      ],
    },
    {
      key: 'fuelType',
      label: fuelType,
      type: 'select',
      options: [
        { label: options.fuelOptions.petrol, value: 'petrol' },
        { label: options.fuelOptions.diesel, value: 'diesel' },
        { label: options.fuelOptions.hybrid, value: 'hybrid' },
        { label: options.fuelOptions.electric, value: 'electric' },
      ],
    },
    {
      key: 'engineCapacity',
      label: engineCapacityLabel,
      type: 'input',
      placeholder: '389',
    },
    {
      key: 'yearOfManufacture',
      label: yearOfManufacture,
      type: 'select',
      options: Array.from({ length: 2026 - 2009 + 1 }, (_, i) => {
        const year = 2026 - i;
        return { label: `${year}`, value: `${year}` };
      }),
    },
    {
      key: 'auction',
      label: auction,
      type: 'select',
      options: [
        { label: 'COPART', value: 'copart' },
        { label: 'IAAI', value: 'iaai' },
      ],
    },
    {
      key: 'auctionLoc',
      label: auctionLoc,
      type: 'select',
      options: auctionLocOptions,
    },
    {
      key: 'departPort',
      label: departPort,
      type: 'select',
      options: departPorts,
    },
    {
      key: 'deliveryPort',
      label: deliveryPort,
      type: 'select',
      options: [
        { label: 'Klaipeda', value: 'kl' },
        { label: 'Batumi', value: 'bt' },
        { label: 'Odesa', value: 'adesa' },
      ],
    },
  ];

  const handleChange = (key, value) => {
    setFormData((prevState) => {
      if (key === 'carMake') {
        return {
          ...prevState,
          carMake: value,
          carModel: '',
        };
      }

      if (key === 'auction') {
        const firstLocation = auctionLocOptions[0];
        return {
          ...prevState,
          [key]: value,
          auctionLoc: firstLocation ? firstLocation.value : '',
          departPort:
            firstLocation && firstLocation.departOptions.length > 0
              ? firstLocation.departOptions[0].label
              : '',
        };
      }
      return {
        ...prevState,
        [key]: value,
      };
    });

    setErrors((prevState) => ({
      ...prevState,
      [key]: !value,
      ...(key === 'carMake' ? { carModel: true } : {}),
    }));
  };

  const handleAmountChange = (key, event) => {
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
    const selectedLocation = auctionLocOptions.find(
      (loc) => loc.value === formData.auctionLoc
    );

    const selectedPortOption = selectedLocation?.departOptions.find(
      (opt) => opt.label === formData.departPort
    );

    const numericAuctionCost = parseAmountInput(formData.auctionCost);

    const updatedFormData = selectedLocation
      ? {
          ...formData,
          auctionCost: numericAuctionCost,
          cityCost:
            selectedPortOption?.value ??
            selectedLocation.departOptions[0]?.value ??
            '',
        }
      : {
          ...formData,
          auctionCost: numericAuctionCost,
        };

    const requiredKeys = [
      'carMake',
      'carModel',
      'auctionCost',
      'transportType',
      'fuelType',
      'engineCapacity',
      'yearOfManufacture',
      'auction',
      'auctionLoc',
      'departPort',
      'deliveryPort',
      'cityCost',
    ];

    const newErrors = requiredKeys.reduce((acc, key) => {
      if (!updatedFormData[key]) {
        acc[key] = true;
      }
      return acc;
    }, {});

    if (!numericAuctionCost || numericAuctionCost <= 0) {
      newErrors.auctionCost = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setData(updatedFormData);
      setIsDataGenerated(true);
    }

    console.log(updatedFormData);
  };

  return (
    <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[40px] desktop:p-[80px] w-full bg-gradient-sub-block self-stretch">
      <h2 className="text-primary mobile:text-28 tablet:text-40 font-bold mb-[72px] text-center">
        {inputData}
      </h2>
      <ul className="grid grid-cols-1 tablet:grid-cols-2 gap-6 justify-items-center">
        {fields.map((item, index) => (
          <li key={index} className="w-full flex flex-col space-y-2">
            {item.type === 'input' ? (
              <>
                <label className="text-secondary text-16 font-medium truncate">
                  {item.label}
                </label>
                <input
                  type="text"
                  inputMode={item.formatAmount ? 'numeric' : undefined}
                  autoComplete="off"
                  placeholder={item.placeholder}
                  value={formData[item.key] || ''}
                  onChange={(e) =>
                    item.formatAmount
                      ? handleAmountChange(item.key, e)
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
                  formData[item.key]
                    ? item.options?.find((o) => o.value === formData[item.key])
                        ?.label || formData[item.key]
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
                onSelect={(option) =>
                  handleChange(
                    item.key,
                    item.key === 'departPort' ? option.label : option.value
                  )
                }
                isLocationSelect={item.key === 'auctionLoc'}
                isPortSelect={item.key === 'departPort'}
                isSearchable={Boolean(item.searchable)}
                disabled={Boolean(item.disabled)}
                searchPlaceholder={item.searchPlaceholder}
              />
            )}
          </li>
        ))}
        <li className="self-end w-full">
          <Button
            className="flex items-center justify-center bg-gradient-red font-bold w-full h-[60px] rounded-sub-block-12 text-18 text-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {calculatePayments}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default InpuDataCalculator;
