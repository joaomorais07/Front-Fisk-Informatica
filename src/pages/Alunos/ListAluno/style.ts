import styled from "styled-components";
import { darkTheme } from "../../../themes";


export const ListaContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  background: ${darkTheme.colors.background};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 15px;
    color: ${darkTheme.colors.text};
  }

  p {
    text-align: center;
    color: ${darkTheme.colors.text};
  }
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${darkTheme.colors.textAlt};
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 10px;
    text-align: left;
  }

  th {
    background: ${darkTheme.colors.secundary};
    color: white;
  }

  tbody tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const Status = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background: ${({ status }) => {
    switch (status) {
      case "Ativo":
        return "green";
      case "Não Matriculado":
        return "gray";
      case "Trancado":
        return "orange";
      case "Cancelado":
        return "red";
      case "Finalizado":
        return "blue";
      case "Pendente":
        return "purple";
      default:
        return "black";
    }
  }};
`;

export const Options = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  border-top: 1px solid ${darkTheme.colors.secundary};
  z-index: 10;
  

  button {
    background: #f1f1f1;
    border: none;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.3s;

    &:hover {
      background: #e0e0e0;
    }

    svg {
      vertical-align: middle;
    }
  }
`;

