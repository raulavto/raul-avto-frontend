'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import CustomSelect from '@/components/UI/CustomSelect/CustomSelect';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/searchAvtoTranslations.json';
import { Autocomplete, AutocompleteItem, Slider } from '@nextui-org/react';

const SearchAvto = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  const router = useRouter();

  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    brandSelection: '',
    modelSelection: '',
    yearOf: [0, 15], // Default range for year of manufacture
    odo: [0, 300000], // Default range for odometer reading
  });

  useEffect(() => {
    const fetchBrandOptions = () => {
      fetch('/api/proxy?type=make')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const formattedOptions = data.data.map(item => ({
            label: item.name,
            value: item.name
          }));
          setBrandOptions(formattedOptions);
        })
        .catch(error => {
          console.error('Error fetching brand options:', error);
        });
    };

    fetchBrandOptions();
  }, []);

  const fetchModelOptions = (brand) => {
    setLoadingModels(true);
    fetch(`/api/proxy?type=model&brand=${brand}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const formattedOptions = data.data.map(item => ({
          label: item.name,
          value: item.name
        }));
        setModelOptions(formattedOptions);
        setLoadingModels(false);
      })
      .catch(error => {
        console.error('Error fetching model options:', error);
        setLoadingModels(false);
      });
  };

  const handleSelectChange = (key, value) => {

    setSelectedOptions(prevState => ({
      ...prevState,
      [key]: value,
      ...(key === 'brandSelection' && { modelSelection: '' }),
    }));

    if (key === 'brandSelection') {
      setLoadingModels(true);
      fetchModelOptions(value);
    }
  };

  const handleSliderChange = (key, value) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const { brandSelection, modelSelection, yearOf, odo } = selectedOptions;
    const params = new URLSearchParams();

    params.append('Count', '36');
    if (brandSelection) params.append('Make', brandSelection.toUpperCase());
    if (modelSelection) params.append('Model', modelSelection.toUpperCase());
    // if (yearOf) {
    //   params.append('YearFrom', yearOf[0].toString());
    //   params.append('YearTo', yearOf[1].toString());
    // }
    // if (odo) {
    //   params.append('OdometerMin', odo[0].toString());
    //   params.append('OdometerMax', odo[1].toString());
    // }

    const query = params.toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className="mobile:ml-auto mobile:mr-auto mobile:mt-8 tablet:mt-2 bg-gradient-sub-block rounded-lg lg:rounded-sub-block-22 p-4 lg:p-[38px] max-w-full sm:max-w-[640px]  fullhd:max-w-[640px] desktop:ml-0 desktop:mr-0">
      <div className="text-[20px] lg:text-24 text-primary mb-4 lg:mb-[20px]">
        {t.find_car}
      </div>
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
          <div className="w-full lg:w-[272px] h-[60px] mobile:z-[25] tablet:z-[20]">
            <Autocomplete
              label={t.select_brand}
              className="w-full flex-1"
              listboxProps={{
                emptyContent: loadingModels ? 'Loading...' : 'No items found'
              }}
              onSelectionChange={(value) => handleSelectChange('brandSelection', value)}
              value={selectedOptions.brandSelection}
            >
              {brandOptions.map((option) => (
                <AutocompleteItem key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="w-full lg:w-[272px] h-[60px] z-[20]">
            <Autocomplete
              label={ t.select_model}
              listboxProps={{
                emptyContent: loadingModels ? 'Loading...' : 'No items found'
              }}
              onSelectionChange={(value) => handleSelectChange('modelSelection', value)}
              value={selectedOptions.modelSelection}
            >
              {modelOptions.map((option) => (
                <AutocompleteItem key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <div className="w-full lg:w-[160px] h-[60px] z-[15]">
            {/* <div>{t.year_from}</div> */}
            <Slider
              label={t.year_range}
              step={1}
              minValue={0}
              maxValue={15}
              defaultValue={selectedOptions.yearOf}
              onChange={(value) => handleSliderChange('yearOf', value)}
              className="max-w-md text-white"
              aria-label="Year Range"
            />
          </div>
          <div className="w-full lg:w-[160px] h-[60px] z-[10]">
            {/* <div>{t.year_to}</div> */}
            <Slider
              label={t.odo_range}
              step={1000}
              minValue={0}
              maxValue={300000}
              defaultValue={selectedOptions.odo}
              // formatOptions={{ style: 'unit', unit: 'kilometer', unitDisplay: 'long' }}
              onChange={(value) => handleSliderChange('odo', value)}
              className="max-w-md text-white"
              aria-label="Odometer Range"
            />
          </div>
          <Button
            className="w-full lg:w-[207px] h-[60px] text-primary text-[16px] lg:text-18 rounded-lg lg:rounded-sub-block-12"
            type="submit"
            onClick={handleSubmit}
            disabled={!selectedOptions.brandSelection}
          >
            {t.find}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAvto;
