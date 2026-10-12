import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Users } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id = 'guests',
  name = 'guests',
  options,
  value,
  onChange,
  placeholder = 'Select number of attendees',
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value && opt.value !== '');

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Filter out empty placeholder options for the menu list
  const selectableOptions = options.filter((opt) => opt.value !== '');

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input for form submission if needed */}
      <input type="hidden" name={name} value={value} />

      {/* Dropdown Trigger Button */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full h-12 px-3.5 rounded-xl bg-white text-sm text-left flex items-center justify-between outline-none transition-all cursor-pointer select-none ${
          error
            ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200'
            : isOpen
            ? 'border-2 border-[#163A63] ring-2 ring-[#163A63]/15'
            : 'border border-stone-300 hover:border-stone-400 focus:border-[#163A63] focus:ring-2 focus:ring-[#163A63]/15'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-stone-100' : ''}`}
      >
        <span
          className={`block truncate ${
            selectedOption ? 'text-[#20050B] font-semibold' : 'text-stone-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-[#78350F] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#163A63]' : ''
          }`}
        />
      </button>

      {/* Custom Theme Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-1.5 w-full bg-[#FFFDF7] rounded-xl border-2 border-[#F59E0B]/60 shadow-[0_16px_40px_rgba(56,8,18,0.22)] overflow-hidden animate-fade-in"
        >
          {/* Menu Header with subtle theme styling */}
          <div className="px-3.5 py-1.5 bg-[#FFF8E7] border-b border-[#F59E0B]/25 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-[#78350F] uppercase">
              SELECT ATTENDEES
            </span>
            <Users className="w-3 h-3 text-[#78350F]" />
          </div>

          {/* Options List */}
          <div className="py-1 max-h-60 overflow-y-auto">
            {selectableOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-3.5 py-2.5 text-sm transition-all cursor-pointer flex items-center justify-between select-none ${
                    isSelected
                      ? 'bg-[#163A63] text-[#FDE68A] font-bold shadow-sm'
                      : 'text-[#380812] hover:bg-[#FFF4D9] hover:text-[#78350F] font-medium'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#FDE68A] shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
