import styled from "styled-components";
import { darkTheme } from "../../themes";


export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
`;

export const LabelFloating = styled.span`
  position: absolute;
  left: 2px;
  top: -5px;
  font-size: 1rem;
  color: #000000;
  pointer-events: none;
  transition: 0.6s;
  border: none;
`;

export const StyledSelectField = styled.select`
  width: 100%;
  margin-top: 15px;
  background: transparent;
  padding: 0.3rem 1.5rem 0.3rem 0.2rem; /* Ajuste o padding */
  border: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.1rem;
  font-weight: 400;
  outline: none;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  font-family: "Inter";
  color: ${darkTheme.colors.text}; /* Estiliza a cor do texto */
  cursor: pointer;

  &:focus {
    border: 1px solid ${darkTheme.colors.secundary};
  }

  /* Estiliza as opções */
  option {
    color: ${darkTheme.colors.text}; /* Cor do texto das opções */
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.3rem 1rem; /* Espaçamento das opções */
    cursor: pointer;
    font-family: "Inter";
  }
`;
