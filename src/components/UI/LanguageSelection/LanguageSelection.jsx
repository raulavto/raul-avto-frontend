'use client';
import React from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import useStore from '../../../app/zustand/useStore';
import { FaChevronDown } from 'react-icons/fa';

const options = [
  { label: 'RU', value: 'ru' },
  { label: 'UA', value: 'ua' },
  { label: 'EN', value: 'en' },
];

const LanguageSelection = () => {
  const setLanguage = useStore((state) => state.setLanguage);
  const language = useStore((state) => state.language); // Получаем текущий язык

  const handleSelectChange = (value) => {
    setLanguage(value.value);
    console.log('Selected label:', value.label);
    console.log('Selected value:', value.value);
  };

  // Находим текущий выбранный язык
  const currentSelectedOption =
    options.find((option) => option.value === language)?.label ||
    options[1].label;

  return (
    <CustomSelect
      currentSelectedOption={currentSelectedOption}
      onSelect={handleSelectChange}
      options={options}
      selectClassName="ml-[10px] text-14 text-primary w-full cursor-pointer"
      optionListClassName="top-full px-[5px] flex flex-col justify-center items-center"
      optionClassName="py-[5px]"
      IconComponent={FaChevronDown}
    />
  );
};

export default LanguageSelection;
