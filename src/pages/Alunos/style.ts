import styled from "styled-components";
import { darkTheme } from "../../themes";

export const ContainerAluno = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  width: 100%;
  padding-bottom: 80px; /* Garante espaço para a BottomNav */
`;

export const HeaderAluno = styled.header`
  background-color: ${darkTheme.colors.secundary};
  padding: 20px;
  color: white;
  text-align: center;
  border-radius: 8px;

  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${darkTheme.colors.secundary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${darkTheme.colors.secundary};
  }

  svg {
    color: white;
  }
`;

export const StudentList = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 16px;
    font-size: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 8px 0;
      border-bottom: 1px solid #ddd;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

export const InputCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;

  input {
    width: 18px;
    height: 18px;
    accent-color: #007bff; /* Cor azul para o checkbox */
    cursor: pointer;
  }

  label {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px; /* Mantém o formulário centralizado e com limite */
  margin: 0 auto;
  padding: 10px;

  .DivBotom {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DivSecao = styled.div`
  padding: 16px;
  border-top: 3px solid ${darkTheme.colors.secundary}; /* Destaque visual para cada seção */
  position: relative; /* Necessário para o título flutuante */

  h1 {
    position: absolute;
    top: -12px;
    left: 16px;
    font-size: 16px;
    font-weight: 600;
    background: #f8f9fa;
    color: ${darkTheme.colors.secundary};
    padding: 0 8px;
  }

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 668px) {
    grid-template-columns: 1fr;
  }
`;
