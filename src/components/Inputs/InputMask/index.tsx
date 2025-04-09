import React, { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";
import { InputContainer, StyledInputField, LabelFloating } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask: string;
}

const InputMask = forwardRef<HTMLInputElement, Props>(
  ({ label, mask, value, defaultValue, onChange, ...props }, ref) => {
    const applyMask = (value: string, mask: string): string => {
      const cleanValue = value.replace(/[^a-zA-Z0-9]/g, "");
      const maskArray = mask.split("");
      let maskedValue = "";
      let valueIndex = 0;

      for (let i = 0; i < maskArray.length; i++) {
        if (maskArray[i] === "9") {
          if (/\d/.test(cleanValue[valueIndex])) {
            maskedValue += cleanValue[valueIndex];
            valueIndex++;
          } else {
            break;
          }
        } else if (maskArray[i] === "A") {
          if (/[a-zA-Z0-9]/.test(cleanValue[valueIndex])) {
            maskedValue += cleanValue[valueIndex].toLocaleUpperCase();
            valueIndex++;
          } else {
            break;
          }
        } else if (maskArray[i] === "?") {
          if (cleanValue[valueIndex]) {
            maskedValue += cleanValue[valueIndex].toLocaleUpperCase();
            valueIndex++;
          }
        } else {
          if (cleanValue[valueIndex]) {
            maskedValue += maskArray[i];
          }
        }
      }

      return maskedValue;
    };

    const [rawValue, setRawValue] = useState<string>(defaultValue ? applyMask(String(defaultValue), mask) : "");

    useEffect(() => {
      const newValue = value ? String(value) : defaultValue ? String(defaultValue) : "";
      setRawValue(applyMask(newValue, mask));
    }, [value, defaultValue, mask]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const rawCleanValue = newValue.replace(/[^a-zA-Z0-9]/g, "");
      const previousCleanValue = rawValue.replace(/[^a-zA-Z0-9]/g, "");
      const isDeleting = rawCleanValue.length < previousCleanValue.length;

      let maskedValue = "";
      if (isDeleting) {
        maskedValue = newValue;
      } else {
        maskedValue = applyMask(rawCleanValue, mask);
      }

      setRawValue(maskedValue);

      if (onChange) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: maskedValue,
          },
        });
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const cleanValue = rawValue.replace(/[^a-zA-Z0-9]/g, "");
      const requiredLength = mask.split("").filter((char) => char === "9" || char === "A").length;
      const maxLength = mask.split("").filter((char) => char === "9" || char === "A" || char === "?").length;

      if (cleanValue.length < requiredLength || cleanValue.length > maxLength) {
        setRawValue("");
        if (onChange) {
          onChange({
            ...event,
            target: {
              ...event.target,
              value: "",
            },
          });
        }
      }
    };
    
    return (
      <InputContainer>
        <StyledInputField
          {...props}
          value={rawValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
          ref={ref}
          spellCheck="false"
        />
        <LabelFloating>{label}</LabelFloating>
      </InputContainer>
    );
  }
);

export default InputMask;
