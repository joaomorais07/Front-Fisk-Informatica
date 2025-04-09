import { forwardRef, InputHTMLAttributes } from "react";
import { InputContainer, StyledInputField, LabelFloating } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  styleDiv?: React.CSSProperties;
  styleInput?: React.CSSProperties;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, type, styleDiv, styleInput, ...props }, ref) => {
    return (
      <InputContainer style={styleDiv}>
        <StyledInputField 
          type={type} 
          placeholder=" " 
          ref={ref} 
          {...props} 
          style={styleInput} 
        />
        <LabelFloating>{label}</LabelFloating>
      </InputContainer>
    );
  }
);

export default InputField;
