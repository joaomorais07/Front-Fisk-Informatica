// SearchInput.tsx
import React, { useState, useEffect, useRef } from "react";
import { Container, InputBox, LabelFloating, SuggestionsList, ClearButton } from "./styles";
import { MdClose } from "react-icons/md";

export type Option = {
  id: string | number;
  label: string;
};

type SearchInputProps = {
  value: string;
  onChange: (value: string, selectedOption?: Option | null) => void;
  options: Option[];
  label?: string;
  onInitialSearch?: (searchTerm: string) => void;
  disabled?: boolean;
};

export function SearchInput({ value, onChange, options, label, onInitialSearch, disabled = false }: SearchInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length >= 3 && onInitialSearch) {
      onInitialSearch(value);
    }

    if (value.length >= 3) {
      const filtered = options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase()));
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [value, options]);

  const handleSelect = (option: Option) => {
    onChange(option.label, option);
    setSelectedOption(option);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    onChange("", null);
    setSelectedOption(null);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  return (
    <Container>
      <InputBox
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value, null)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        disabled={disabled || !!selectedOption}
        placeholder=" "
      />
      <LabelFloating>{label}</LabelFloating>
      {!!selectedOption && <ClearButton onClick={handleClear}><MdClose size={20} /> </ClearButton>}

      {showSuggestions && filteredOptions.length > 0 && (
        <SuggestionsList>
          {filteredOptions.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </SuggestionsList>
      )}
    </Container>
  );
}
