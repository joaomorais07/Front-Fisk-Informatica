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

  th,
  td {
    padding: 10px;
    text-align: left;
    word-break: break-word;
  }

  .tdOptions {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 5px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      &:hover {
        background: #666;
      }
    }
  }

  th {
    background: ${darkTheme.colors.secundary};
    color: white;
  }

  tbody tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.05);
  }

  .search-row {
    display: table-row;
  }

  .table-header {
    display: table-row;
  }

  @media (max-width: 768px) {
    display: block;

    thead {
      display: block;

      tr {
        display: block;
        margin-bottom: 10px;

        th {
          display: block;
          text-align: left;
          padding: 8px;
          background: none;
          color: ${darkTheme.colors.text};
        }

        &:last-child {
          display: none; // Esconde os cabeçalhos fixos da tabela
        }
      }
    }

    .tdOptions {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        padding: 5px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        &:hover {
          background: #666;
        }
      }
    }

    tbody {
      display: block;
    }

    tr {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      background: ${darkTheme.colors.textAlt};
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    td {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border: none;
      align-items: center;
    }

    td::before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 10px;
      color: ${darkTheme.colors.text};
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? darkTheme.colors.secundary : "#e0e0e0")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ active }) => (active ? darkTheme.colors.secundary : "#ccc")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Status = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background: ${({ status }) => {
    switch (status) {
      case "A":
        return "#004eff";
      case "P":
        return "#ff9900";
      case "C":
        return "#1bad1b";
      case "D":
        return "gray";
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

export const DivStatus = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;
