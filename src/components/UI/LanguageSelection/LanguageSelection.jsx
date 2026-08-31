'use client';
import CustomSelect from '../CustomSelect/CustomSelect';
import useStore from '../../../app/zustand/useStore';
import { FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const options = [
  { label: 'RU', value: 'ru' },
  { label: 'UA', value: 'ua' },
  { label: 'EN', value: 'en' },
];

const LanguageSelection = () => {
  const pathname = usePathname();
  const isLeadForm =
    pathname === '/lead-form' || pathname === '/lead-form-thanks';
  const setLanguage = useStore((state) => state.setLanguage);
  const language = useStore((state) => state.language);

  const handleSelectChange = (value) => {
    setLanguage(value.value);
  };

  const currentSelectedOption =
    options.find((option) => option.value === language)?.label ||
    options[1].label;

  return (
    !isLeadForm && (
      <CustomSelect
        variant="compact"
        currentSelectedOption={currentSelectedOption}
        onSelect={handleSelectChange}
        options={options}
        selectClassName="text-primary"
        IconComponent={FaChevronDown}
      />
    )
  );
};

export default LanguageSelection;
