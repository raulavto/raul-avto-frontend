'use client';

import { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { matchesLayoutInsensitive } from '@/utils/keyboardLayoutSearch';

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
  isSearchable?: boolean;
  disabled?: boolean;
  searchPlaceholder?: string;
  /** compact — для хедера (мова), без важких акцентів калькулятора */
  variant?: 'default' | 'compact';
}

/** Скролить лише всередині списку, без scrollIntoView (він рухає батьківські контейнери). */
function scrollOptionIntoList(
  list: HTMLUListElement,
  index: number
) {
  const item = list.children[index] as HTMLElement | undefined;
  if (!item) return;

  const itemTop = item.offsetTop;
  const itemBottom = itemTop + item.offsetHeight;
  const viewTop = list.scrollTop;
  const viewBottom = viewTop + list.clientHeight;

  if (itemTop < viewTop) {
    list.scrollTop = itemTop;
  } else if (itemBottom > viewBottom) {
    list.scrollTop = itemBottom - list.clientHeight;
  }
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
  isSearchable = false,
  disabled = false,
  searchPlaceholder = 'Search...',
  variant = 'default',
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filterText, setFilterText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchable = isLocationSelect || isSearchable;
  const isCompact = variant === 'compact';

  useEffect(() => {
    const selected = options.find(
      (option) =>
        option.value === currentSelectedOption ||
        option.label === currentSelectedOption
    );
    setSelectedOption(selected || null);
  }, [currentSelectedOption, options]);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
      setFilterText('');
      setHighlightedIndex(-1);
    }
  }, [disabled]);

  useEffect(() => {
    if (!isOpen) return;

    const close = () => {
      setIsOpen(false);
      setFilterText('');
      setHighlightedIndex(-1);
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable) {
      const timer = window.setTimeout(() => {
        searchRef.current?.focus({ preventScroll: true });
      }, 40);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  const filteredOptions = searchable
    ? options.filter((option) =>
        matchesLayoutInsensitive(option.label, filterText)
      )
    : options;

  // Не даємо скролу «пробивати» список і крутити сторінку
  useEffect(() => {
    if (!isOpen) return;

    let remove: (() => void) | undefined;
    const frame = requestAnimationFrame(() => {
      const dropdown = dropdownRef.current;
      const list = listRef.current;
      if (!dropdown || !list) return;

      const onWheel = (event: WheelEvent) => {
        const { scrollTop, scrollHeight, clientHeight } = list;
        const canScroll = scrollHeight > clientHeight + 1;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const scrollingUp = event.deltaY < 0;
        const scrollingDown = event.deltaY > 0;

        // Нативний скрол списку лишаємо плавним;
        // блокуємо лише «пробивання» на краї або коли скролити нічого
        if (
          !canScroll ||
          (atTop && scrollingUp) ||
          (atBottom && scrollingDown)
        ) {
          event.preventDefault();
        }
      };

      dropdown.addEventListener('wheel', onWheel, { passive: false });
      remove = () => dropdown.removeEventListener('wheel', onWheel);
    });

    return () => {
      cancelAnimationFrame(frame);
      remove?.();
    };
  }, [isOpen, filteredOptions.length]);

  const displayLabel = selectedOption
    ? selectedOption.label
    : currentSelectedOption;

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setFilterText('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(option);
  };

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => {
      if (prev) {
        setFilterText('');
        setHighlightedIndex(-1);
      }
      return !prev;
    });
  };

  const moveHighlight = (nextIndex: number) => {
    setHighlightedIndex(nextIndex);
    requestAnimationFrame(() => {
      if (listRef.current) {
        scrollOptionIntoList(listRef.current, nextIndex);
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === 'Escape') {
      setIsOpen(false);
      setFilterText('');
      setHighlightedIndex(-1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (!isOpen) {
        event.preventDefault();
        setIsOpen(true);
        return;
      }
      if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
        event.preventDefault();
        handleOptionClick(filteredOptions[highlightedIndex]);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      moveHighlight(
        Math.min(highlightedIndex + 1, filteredOptions.length - 1)
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveHighlight(Math.max(highlightedIndex - 1, 0));
    }
  };

  return (
    <>
      {label ? (
        <label
          className={`text-primary text-16 font-medium ${labelClassName || ''}`}
        >
          {label}
        </label>
      ) : null}

      <div
        ref={rootRef}
        className={`relative flex flex-col min-w-0 ${isCompact ? 'w-auto' : 'w-full'} ${containerClassName || ''}`}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={toggleOpen}
          className={`group relative flex items-center min-w-0 box-border outline-none appearance-none z-[15] transition-all duration-300 ease-out ${
            isCompact
              ? 'justify-center gap-[6px] px-[10px] py-[6px] rounded-sub-block-8 border border-transparent hover:border-primary/60'
              : 'justify-between gap-[8px] w-full'
          } ${
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          } ${
            !isCompact && !disabled ? 'hover:border-[#5c6066]' : ''
          } ${
            isOpen && !isCompact
              ? 'border-focus shadow-[0_0_0_1px_rgba(255,62,0,0.45)]'
              : ''
          } ${
            isOpen && isCompact ? 'border-primary/80 bg-white/5' : ''
          } ${selectClassName || ''}`}
        >
          <span
            className={`truncate whitespace-nowrap leading-[1.25] transition-colors duration-300 ${
              isCompact
                ? 'flex-none text-center text-[14px] font-semibold'
                : 'min-w-0 flex-1 text-left'
            } ${isOpen ? 'text-hoverprimary' : ''}`}
          >
            {displayLabel}
          </span>
          <span
            className={`shrink-0 flex items-center justify-center rounded-full transition-all duration-300 ${
              isCompact ? 'w-[18px] h-[18px]' : 'w-[26px] h-[26px]'
            } ${
              isOpen
                ? 'bg-gradient-red text-white rotate-180'
                : 'bg-white/5 text-secondary group-hover:text-primary group-hover:bg-white/10'
            }`}
          >
            <IconComponent size={isCompact ? 9 : 11} />
          </span>
        </button>

        <AnimatePresence>
          {isOpen && !disabled ? (
            <motion.div
              key="select-dropdown"
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top center' }}
              className={`absolute z-[40] ${
                isCompact
                  ? 'left-0 top-[calc(100%+6px)] min-w-full'
                  : 'left-0 right-0 top-[calc(100%+8px)]'
              }`}
            >
              <div
                ref={dropdownRef}
                className={`overflow-hidden border border-primary bg-gradient-select shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${
                  isCompact ? 'rounded-sub-block-10 w-full' : 'rounded-sub-block-12'
                }`}
              >
                {searchable ? (
                  <div className="p-[10px] border-b border-primary">
                    <div className="relative">
                      <FaSearch className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-secondary text-[12px] z-[1]" />
                      <input
                        ref={searchRef}
                        type="text"
                        className="box-border w-full max-w-full h-[40px] pl-[36px] pr-[12px] rounded-sub-block-8 bg-input border border-primary text-primary text-[14px] leading-[18px] font-medium placeholder:text-placeholderText transition-[border-color] duration-200 focus:outline-none focus:border-focus"
                        placeholder={searchPlaceholder}
                        value={filterText}
                        onChange={(e) => {
                          setFilterText(e.target.value);
                          setHighlightedIndex(0);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ) : null}

                <ul
                  ref={listRef}
                  role="listbox"
                  className={`${
                    isCompact
                      ? 'py-[4px] overflow-visible'
                      : `max-h-[220px] overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar py-[6px] [scrollbar-gutter:stable] ${optionListClassName || ''}`
                  }`}
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => {
                      const isSelected =
                        selectedOption?.value === option.value ||
                        currentSelectedOption === option.label ||
                        currentSelectedOption === option.value;
                      const isHighlighted = highlightedIndex === index;

                      return (
                        <li
                          key={`${option.value}-${index}`}
                          role="option"
                          aria-selected={isSelected}
                          className={`relative cursor-pointer font-medium transition-colors duration-150 ${
                            isCompact
                              ? 'mx-[4px] my-[2px] px-[12px] py-[8px] rounded-sub-block-8 text-[13px] leading-[16px] text-center'
                              : 'ml-[6px] mr-[12px] my-[2px] px-[14px] py-[11px] rounded-sub-block-8 text-[14px] leading-[18px]'
                          } ${
                            isSelected
                              ? 'bg-[#ea001c1a] text-hoverprimary'
                              : isHighlighted
                                ? 'bg-white/10 text-hoverprimary'
                                : 'text-primary hover:bg-white/5 hover:text-hoverprimary'
                          } ${optionClassName || ''}`}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          onClick={() => handleOptionClick(option)}
                        >
                          {isSelected && !isCompact ? (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full bg-gradient-red" />
                          ) : null}
                          <span className="block truncate">{option.label}</span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-[20px] py-[14px] text-secondary text-[14px] font-medium">
                      —
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CustomSelect;
