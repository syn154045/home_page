import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { LuCheck } from 'react-icons/lu';
import type { SelectOption, DropdownPosition } from './types';

type DropdownProps = {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  isMulti: boolean;
  activeIndex: number | null;
  targetRef: React.RefObject<HTMLDivElement | null>;
  position: DropdownPosition;
  onSelect: (option: SelectOption) => void;
  onClose: () => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  isMulti,
  activeIndex,
  targetRef,
  position,
  onSelect,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!targetRef.current) return;

    const calculateStyle = (): void => {
      const targetRect = targetRef.current!.getBoundingClientRect();
      const dropdownRect = dropdownRef.current?.getBoundingClientRect();

      const newStyle: React.CSSProperties = {
        position: 'fixed',
        minWidth: `${targetRect.width}px`,
        zIndex: 1001,
      };

      switch (position) {
        case 'topLeft':
          newStyle.top = `${targetRect.top - (dropdownRect?.height || 0) - 4}px`;
          newStyle.left = `${targetRect.left}px`;
          break;
        case 'topRight':
          newStyle.top = `${targetRect.top - (dropdownRect?.height || 0) - 4}px`;
          newStyle.left = `${targetRect.right - (dropdownRect?.width || targetRect.width)}px`;
          break;
        case 'bottomRight':
          newStyle.top = `${targetRect.bottom + 4}px`;
          newStyle.left = `${targetRect.right - (dropdownRect?.width || targetRect.width)}px`;
          break;
        case 'bottomLeft':
        default:
          newStyle.top = `${targetRect.bottom + 4}px`;
          newStyle.left = `${targetRect.left}px`;
          break;
      }
      setStyle(newStyle);
    };

    calculateStyle();

    const observer = new ResizeObserver(calculateStyle);
    observer.observe(targetRef.current);

    window.addEventListener('scroll', calculateStyle, true);

    return (): void => {
      observer.disconnect();
      window.removeEventListener('scroll', calculateStyle, true);
    };
  }, [targetRef, position]);

  useEffect(() => {
    if (activeIndex !== null && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      );
      if (activeItem) {
        activeItem.scrollIntoView({
          block: 'nearest',
          inline: 'start',
        });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        targetRef.current &&
        !targetRef.current.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, targetRef]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      ref={dropdownRef}
      style={style}
      role="listbox"
      className="max-h-60 overflow-auto rounded-md border border-neutral-600 bg-neutral-800 p-1 shadow-lg"
    >
      <ul>
        {options.map((option, index) => {
          const isSelected = isMulti
            ? Array.isArray(value) && value.includes(option.value)
            : value === option.value;

          const isHighlighted = activeIndex === index;

          return (
            <li
              key={option.value}
              data-index={index}
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(option)}
              className={`
                flex cursor-pointer items-center justify-between gap-1 rounded px-2 py-1.5 text-sm
                ${option.disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${isHighlighted && !option.disabled ? 'bg-primary-500/20' : ''}
                ${!isHighlighted && !option.disabled ? 'hover:bg-primary-500/20' : ''}
                ${isSelected ? 'font-semibold text-primary-400' : 'text-neutral-200'}
              `}
            >
              <span>{option.label}</span>
              {isSelected && <LuCheck />}
            </li>
          );
        })}
      </ul>
    </div>,
    document.body
  );
};
