
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
};

function Input(props: InputProps) {
  const { id, label, textRef, mask, type, placeholder, error } = props;

  const [text, setText] = useState("");

  function handleWrite(event: React.ChangeEvent<HTMLInputElement>) {
    switch (mask) {
      case "name":
        textRef.current = maskName(event.target.value);
        setText(textRef.current);
        break;
      case "email":
        textRef.current = maskEmail(event.target.value);
        setText(textRef.current);
        break;
      case "cpf":
        textRef.current = maskCPF(event.target.value);
        setText(textRef.current);
        break;
      default:
        textRef.current = event.target.value;
        setText(textRef.current);
        break;
    }
  }

  return (
    <InputContainer>
      <label htmlFor={id}>{label}</label>
      <input
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
