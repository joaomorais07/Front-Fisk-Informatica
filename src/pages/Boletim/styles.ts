import styled from "styled-components";
import { darkTheme } from "../../themes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  padding-bottom: 80px;
  background-color: #f9f9f9;
`;

export const HeaderBoletim = styled.header`
  background-color: ${darkTheme.colors.secundary};
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  font-size: 24px;
`;

export const Select = styled.select`
  padding: 10px;
  margin-right: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const AlunoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerNotas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

export const AlunoCard = styled.div`
  flex: 1 1 200px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const InputNota = styled.input`
  width: 100%;
  padding: 8px 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;

  /* Remover spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Modal = styled.div`
  position: relative;
  background-color: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 20px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  h2 {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
`;

export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .checkboxInput {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #4a90e2;
    border-radius: 4px;
    outline: none;
    transition: all 0.2s ease;
    position: relative;
    margin-right: 8px;
    vertical-align: middle;
  }

  .checkboxInput:checked {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }

  .checkboxInput:checked::after {
    content: "✓";
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }

  .checkboxInput:focus {
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }

  .checkboxLabel {
    cursor: pointer;
    font-size: 16px;
    color: #333;
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  /* Efeito hover */
  .checkboxLabel:hover .checkboxInput {
    border-color: #357ab8;
  }

  /* Estado desabilitado */
  .checkboxInput:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkboxInput:disabled + .checkboxLabel {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  td input {
    width: 60px;
    padding: 5px;
    text-align: center;
  }
`;

export const ButtonController = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;
