import styled from "styled-components";
import { darkTheme } from "../../../themes";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 15px;

  span {
    transition: all 0.3s ease-in-out;
  }
`;

export const LabelFloating = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  font-weight: 500;
  color: #7f8fa6;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  input:focus ~ &,
  input:not(:placeholder-shown) ~ & {
    background-color: #f5f5f5;
  }

  &.focused {
    color: black;
    top: 0;
    transform: none;
    font-size: 0.85rem;
    font-weight: 600;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 0.75rem 0.25rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: transparent;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: ${darkTheme.colors.secundary};
    background: #fff;
  }

  &:not(:placeholder-shown) + ${LabelFloating}, &:focus + ${LabelFloating} {
    top: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${darkTheme.colors.secundary};
  }
`;
