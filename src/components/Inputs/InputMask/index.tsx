import React, { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";
import { InputContainer, StyledInputField, LabelFloating } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask: string;
  value?: string;
  defaultValue?: string;
}

const InputMask = forwardRef<HTMLInputElement, Props>(
  ({ label, mask, value, defaultValue, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>("");

    // Função para aplicar máscara
    const applyMask = (inputValue: string): string => {
      const cleanValue = inputValue.replace(/\D/g, '');
      let result = '';
      let index = 0;

      for (let i = 0; i < mask.length; i++) {
        if (index >= cleanValue.length) break;

        const maskChar = mask[i];
        const valueChar = cleanValue[index];

        if (maskChar === '9') {
          if (/\d/.test(valueChar)) {
            result += valueChar;
            index++;
          }
        } else {
          result += maskChar;
          if (valueChar === maskChar) {
            index++;
          }
        }
      }

      return result;
    };

    // Atualiza quando o valor externo muda
    useEffect(() => {
      const newValue = value || defaultValue || '';
      const formattedValue = applyMask(String(newValue));
      setDisplayValue(formattedValue);
    }, [value, defaultValue, mask]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, '');
      const newDisplayValue = applyMask(rawValue);
      
      setDisplayValue(newDisplayValue);

      if (onChange) {
        e.target.value = rawValue; // Envia o valor sem máscara
        onChange(e);
      }
    };

    return (
      <InputContainer>
        <StyledInputField
          {...props}
          value={displayValue}
          onChange={handleChange}
          placeholder=" "
          ref={ref}
        />
        <LabelFloating>{label}</LabelFloating>
      </InputContainer>
    );
  }
);

InputMask.displayName = "InputMask";
export default InputMask;