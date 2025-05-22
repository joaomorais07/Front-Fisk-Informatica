// styles.ts
import styled from "styled-components";
import { darkTheme } from "../../../themes";

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 15px;
`;

export const LabelFloating = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
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

export const InputBox = styled.input`
  width: 100%;
  padding: 1rem 2.5rem 0.25rem 0.75rem; /* padding right maior pro X */
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background: transparent;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: ${darkTheme.colors.secundary};
    background: whitesmoke;
  }

  &:not(:placeholder-shown) + ${LabelFloating},
  &:focus + ${LabelFloating} {
    top: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${darkTheme.colors.secundary};
    background: whitesmoke;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: white;
  z-index: 999;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;

  li {
    padding: 10px 15px;
    list-style: none;
    cursor: pointer;

    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border-radius: 5px;
  padding: 1px;
  border: none;
  font-size: 1.1rem;
  color: #999;
  cursor: pointer;

  &:hover {
    background-color:rgb(226, 238, 237);
  }

  svg{
    color: red;
  }
`;
