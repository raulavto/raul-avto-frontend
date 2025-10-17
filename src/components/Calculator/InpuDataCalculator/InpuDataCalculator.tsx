'use client';
import CustomSelect from '@/components/UI/CustomSelect/CustomSelect';
import Button from '@/components/UI/Button/Button';
import { useEffect, useState } from 'react';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calculator.json';

const InpuDataCalculator = ({ setData }) => {
  const language = useStore((state) => state.language);

  const [formData, setFormData] = useState({
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

      // Якщо локація ще не вибрана, встановлюємо першу доступну
      if (locations.length > 0 && !formData.auctionLoc) {
        setFormData((prevState) => ({
          ...prevState,
          auctionLoc: locations[0].value, // Оновлюємо auctionLoc
          departPort: locations[0].departOptions[0]?.label || '', // Встановлюємо перший порт
        }));
      }
    } catch (error) {
      console.error('Помилка отримання даних:', error);
    }
  };

  useEffect(() => {
    const updateAuctionData = async () => {
      // Завантаження нових даних залежно від обраної платформи
      await fetchAuctionData(formData.auction);
    };

    updateAuctionData();
  }, [formData.auction]);

  useEffect(() => {
    // Якщо платформа аукціону змінилася, скидаємо локацію до першої в списку
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
      key: 'auctionCost',
      label: auctionCost,
      type: 'input',
      placeholder: '2000',
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
      options: Array.from({ length: 2024 - 2009 + 1 }, (_, i) => {
        const year = 2024 - i;
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
      // Якщо змінюється платформа аукціону, скидаємо вибрану локацію до першої з списку
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
    }));
  };

  const handleSubmit = () => {
    // Знаходимо відповідну локацію для cityCost
    const selectedLocation = auctionLocOptions.find(
      (loc) => loc.value === formData.auctionLoc
    );

    const updatedFormData = selectedLocation
      ? {
          ...formData,
          cityCost: selectedLocation.departOptions[0]?.value || '',
        }
      : formData;

    const newErrors = Object.keys(updatedFormData).reduce((acc, key) => {
      if (!updatedFormData[key]) {
        acc[key] = true;
      }
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setData(updatedFormData);
    }

    console.log(updatedFormData);
  };

  return (
    <div className="container mx-auto mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[40px] desktop:p-[80px] max-w-[832px] w-full bg-gradient-sub-block self-start">
      <h2 className="text-primary mobile:text-28 tablet:text-40 font-bold mb-[72px] text-center">
        {inputData}
      </h2>
      <ul className="grid grid-cols-1 tablet:grid-cols-2 gap-6 justify-items-center">
        {fields.map((item, index) => (
          <li key={index} className="w-full flex flex-col space-y-6">
            {item.type === 'input' ? (
              <>
                <label className="text-secondary text-16 font-semibold mb-[8px] truncate">
                  {item.label}
                </label>
                <input
                  placeholder={item.placeholder}
                  value={formData[item.key] || ''}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className={`border ${
                    errors[item.key] ? 'border-red-500' : 'border-primary'
                  } rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] px-[20px] text-primary text-18 font-semibold focus:outline-focus outline-none`}
                />
              </>
            ) : (
              <CustomSelect
                currentSelectedOption={item.options && item.options[0]?.label}
                label={item.label}
                options={item.options || []}
                containerClassName="w-full flex-1"
                labelClassName="text-secondary text-16 mb-[8px] truncate"
                selectClassName="border border-primary rounded-sub-block-12 bg-input w-full h-[60px] py-[18px] px-[20px] text-primary text-18 font-semibold"
                optionClassName="text-primary w-full"
                optionListClassName="max-h-[100px]"
                onSelect={(option) =>
                  handleChange(
                    item.key,
                    item.key === 'departPort' ? option.label : option.value
                  )
                }
                isLocationSelect={item.key === 'auctionLoc'}
                isPortSelect={item.key === 'departPort'}
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
