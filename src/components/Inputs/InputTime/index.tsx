import React from "react";
import { Controller } from "react-hook-form";
import { InputWrapper, StyledInput, LabelFloating } from "./style";

interface Props {
  name: string;
  control: any;
  label: string;
  required?: boolean;
}

const formatTime = (value: string) => {
  // Remove tudo que não é número
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const [h1 = "", m1 = "", h2 = "", m2 = ""] = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6), digits.slice(6, 8)];
  let formatted = h1;
  if (m1) formatted += `:${m1}`;
  if (h2) formatted += ` às ${h2}`;
  if (m2) formatted += `:${m2}`;
  return formatted;
};

const InputTimeRange: React.FC<Props> = ({ name, control, label, required }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required && "Campo obrigatório",
        pattern: {
          value: /^\d{2}:\d{2} às \d{2}:\d{2}$/,
          message: "Formato inválido (HH:MM às HH:MM)",
        },
      }}
      render={({ field: { onChange, value, ...rest } }) => (
        <InputWrapper>
          
          <StyledInput
            {...rest}
            value={value || ""}
            onChange={(e) => {
              const formatted = formatTime(e.target.value);
              onChange(formatted);
            }}
            maxLength={15}
            autoComplete="off"
          />
          <LabelFloating>{label}</LabelFloating>
        </InputWrapper>
      )}
    />
  );
};

export default InputTimeRange;
