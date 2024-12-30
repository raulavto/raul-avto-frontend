'use client';
import { useEffect, useState } from 'react';
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
  isLocationSelect?: boolean;
  isPortSelect?: boolean;
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
  isLocationSelect = false,
  isPortSelect = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filterText, setFilterText] = useState<string>(''); 

  useEffect(() => {
    if (isLocationSelect || isPortSelect) {
      const selected = options.find(option => option.value === currentSelectedOption);
      setSelectedOption(selected || null);
    }
  }, [currentSelectedOption, options, isLocationSelect, isPortSelect]);

  // Фільтруємо опції на основі введеного тексту
  const filteredOptions = isLocationSelect
    ? options.filter(option =>
        option.label.toLowerCase().includes(filterText.toLowerCase())
      )
    : options;

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setFilterText(''); 
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <>
      <label className={`text-primary text-16 font-medium mb-[8px] ${labelClassName}`}>
        {label}
      </label>
      <div className={`relative flex flex-col ${containerClassName}`}>
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
        {isOpen && (
          <div className="relative">
           
            <ul
              className={`absolute top-[100%] left-0 right-0 py-[14px] px-[24px] bg-gradient-select border border-primary rounded-sub-block-10 z-[20] overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out transform ${
                isOpen
                  ? 'max-h-[185px] opacity-100 translate-y-0'
                  : 'hidden'
              } ${optionListClassName}`}
            >
               {isLocationSelect && (
              <input
                type="text"
                className="w-full px-[12px] py-[8px] bg-transparent  text-primary text-14 font-bold border border-primary rounded mb-[8px] focus:outline-none"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            )}
              {filteredOptions.length > 0 && (
                filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`py-[14px] cursor-pointer transition duration-300 ease-in-out hover:bg-input border-t border-primary text-primary text-14 font-bold ${optionClassName}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
