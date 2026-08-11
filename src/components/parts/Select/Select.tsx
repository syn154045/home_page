import { useState, useRef, useEffect, type FC } from 'react';
import { LuChevronDown, LuX } from 'react-icons/lu';
import { Dropdown } from './Dropdown';
import { DropdownPosition, SelectOption } from './types';

type SelectProps = Omit<React.ComponentProps<'div'>, 'onChange'> & {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  dropdownPosition?: DropdownPosition;
  isMulti?: boolean;
};

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  hasError = false,
  disabled = false,
  dropdownPosition = 'bottomLeft',
  isMulti = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    }
  }, [isOpen]);

  const handleSelect = (option: SelectOption): void => {
    if (option.disabled) return;

    if (isMulti) {
      const currentValue = Array.isArray(value) ? value : [];
      let newValue: (string | number)[];
      if (currentValue.includes(option.value)) {
        newValue = currentValue.filter((v) => v !== option.value);
      } else {
        newValue = [...currentValue, option.value];
      }
      onChange?.(newValue);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  const handleRemoveTag = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemValue: string | number
  ): void => {
    e.stopPropagation();
    if (!isMulti || !Array.isArray(value)) return;
    const newValue = value.filter((v) => v !== itemValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          if (activeIndex !== null && options[activeIndex]) {
            handleSelect(options[activeIndex]);
          }
        } else {
          setIsOpen(true);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setActiveIndex((prevIndex) => {
          if (prevIndex === null || prevIndex === options.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setActiveIndex((prevIndex) => {
          if (prevIndex === null || prevIndex === 0) {
            return options.length - 1;
          }
          return prevIndex - 1;
        });
        break;

      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
        }
        break;

      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  const selectedOptions = isMulti
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : [];
  const selectedOption = !isMulti
    ? options.find((opt) => opt.value === value)
    : null;

  return (
    <div onKeyDown={handleKeyDown} className="relative" {...props}>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          flex w-full items-center justify-between gap-1 rounded border bg-neutral-800 px-2 py-1.5 text-left text-sm outline-none transition-all duration-300
          ${disabled ? 'cursor-not-allowed bg-neutral-500/40 opacity-60' : 'cursor-pointer hover:bg-neutral-700 focus:border-primary-600'}
          ${hasError ? 'border-error-600' : 'border-neutral-400'}
          ${isOpen ? 'border-primary-600' : ''}
        `}
      >
        {isMulti ? (
          <div className="flex flex-wrap items-center gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="flex items-center gap-1 rounded bg-primary-900 px-1.5 py-0.5 text-xs text-primary-200"
                >
                  <span className="break-all">{option.label}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveTag(e, option.value)}
                    className="rounded-full hover:bg-primary-700"
                    aria-label={`${option.label}を削除`}
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-neutral-400">{placeholder}</span>
            )}
          </div>
        ) : (
          <span
            className={
              selectedOption ? 'truncate text-neutral-50' : 'text-neutral-400'
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        )}
        <LuChevronDown
          className={`shrink-0 text-neutral-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <Dropdown
          options={options}
          value={value}
          isMulti={isMulti}
          activeIndex={activeIndex}
          targetRef={triggerRef}
          position={dropdownPosition}
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
