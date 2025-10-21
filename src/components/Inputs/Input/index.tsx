import { maskCPF, maskEmail, maskName } from "../../../utils/masks";
import { InputContainer } from "./style";
import { MutableRefObject, useState } from "react";

type InputProps = {
  id: string;
  label: string;
  textRef: MutableRefObject<string>;
  mask?: "name" | "email" | "cpf";
  type?: string;
  placeholder?: string;
  error?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
};

function Input(props: InputProps) {
  const {
    id,
    style,
    label,
    textRef,
    mask,
    type,
    placeholder,
    error,
    variant = "primary",
  } = props;

  const [text, setText] = useState("");

  function handleWrite(event: React.ChangeEvent<HTMLInputElement>) {
    switch (mask) {
      case "name":
        textRef.current = maskName(event.target.value);
        break;
      case "email":
        textRef.current = maskEmail(event.target.value);
        break;
      case "cpf":
        textRef.current = maskCPF(event.target.value);
        break;
      default:
        textRef.current = event.target.value;
        break;
    }
    setText(textRef.current);
  }

  return (
    <InputContainer variant={variant}>
      <label htmlFor={id}>{label}</label>
      <input
        style={style}
        id={id}
        type={type || "text"}
        value={text}
        onChange={handleWrite}
        placeholder={placeholder}
      />
      {error && <span>{error}</span>}
    </InputContainer>
  );
}

export default Input;
