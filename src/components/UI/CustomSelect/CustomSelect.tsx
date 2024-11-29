'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  optionClassName?: string;
  optionListClassName?: string;
  onSelect: (value: Option) => void;
  currentSelectedOption: string;
  IconComponent?: IconType;
}

const CustomSelect = ({
  label,
  options,
  containerClassName,
  labelClassName,
  selectClassName,
  optionListClassName,
  optionClassName,
  onSelect,
  currentSelectedOption,
  IconComponent = FaChevronDown,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <>
      <label
        className={`text-primary text-16 font-medium mb-[8px] ${labelClassName}`}
      >
        {label}
      </label>
      <div className={`relative z-[15] flex flex-col ${containerClassName}`}>
        <div
          className={`flex items-center justify-between focus:outline-focus outline-none appearance-none cursor-pointer z-[15] ${selectClassName}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : currentSelectedOption}
          <IconComponent
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            size={18}
          />
        </div>
        <ul
          className={`absolute top-[70%] left-0 right-0 py-[14px] px-[24px] bg-gradient-select border border-primary rounded-sub-block-10 z-[10] overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out transform ${
            isOpen
              ? 'max-h-[145px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 translate-y-[-10px]'
          } ${optionListClassName}`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`py-[14px] cursor-pointer transition duration-300 ease-in-out hover:bg-input border-t border-primary text-primary text-14 font-bold ${optionClassName}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CustomSelect;
