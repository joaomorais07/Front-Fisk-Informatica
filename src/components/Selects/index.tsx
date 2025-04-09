import  { ChangeEvent, forwardRef } from "react";
import { SelectFieldProps } from "../../utils/types";
import { InputContainer, StyledSelectField } from "./styles";

interface Props extends SelectFieldProps {
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void; // Incluímos onChange aqui
  onValueChange?: (value: string) => void; // Corrigimos o nome do handler
}

const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ onChange, onValueChange, style, defaultValue, ...props }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      if (onValueChange) {
        onValueChange(value);
      }
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <InputContainer>
        <StyledSelectField
          onChange={handleChange}
          style={style}
          ref={ref}
          defaultValue={defaultValue}
          {...props} // Espalha as props restantes
        />
  
      </InputContainer>
    );
  }
);

export default SelectField;
