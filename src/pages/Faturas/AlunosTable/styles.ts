import styled from "styled-components";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface StatusProps {
  status: string;
}

interface PageButtonProps {
  active?: boolean;
}

export const Tabela = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: ${({ theme }) => theme.colors.background || "#fff"};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 20px;

  thead th {
    padding: 1rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.secundary || "#3498db"};
    color: white;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    position: sticky;
    top: 0;
  
  }

  tbody tr {
    transition: background 0.2s;

    &:nth-child(even) {
      background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#f8f9fa"};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverBackground || "rgba(0, 0, 0, 0.03)"};
    }
  }

  tbody td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text || "#333"};
    vertical-align: middle;
  }

  tfoot td {
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#f9f9f9"};
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tbody tr {
      display: block;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 0.5rem;
    }

    tbody td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1rem;
      text-align: right;
      border-bottom: none;

      &::before {
        content: attr(data-label);
        font-weight: 600;
        color: ${({ theme }) => theme.colors.textSecondary || "#666"};
        margin-right: 1rem;
      }
    }
  }
`;

export const Status = styled.span<StatusProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
  background-color: ${({ status, theme }) =>
    status === "pendente"
      ? theme.colors.warning || "#f39c12"
      : status === "inadimplente"
      ? theme.colors.error || "#e74c3c"
      : theme.colors.success || "#2ecc71"};
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    margin-right: 6px;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff3f3;
  color: #dc3545;
  border-radius: 8px;
  margin-top: 1rem;
`;


export const PageButton = styled.button<PageButtonProps>`
  background-color: ${({ active, theme }) => (active ? theme.colors.secundary : theme.colors.backgroundSecondary || "#f8f9fa")};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text || "#495057")};
  padding: 0.5rem 0.9rem;
  margin: 0 0.15rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ active, theme }) => (active ? theme.colors.primaryDark : theme.colors.hoverBackground || "#e9ecef")};
    transform: translateY(-1px);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  gap: 0.3rem;
`;

export const Options = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;

  button {
    background: ${({ theme }) => theme.colors.secundary || "#3498db"};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;

    svg {
      font-size: 0.9rem;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark || "#2980b9"};
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const SearchContainer = styled.div`
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.background || "#fff"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  display: flex;
  justify-content: flex-end;
`;

export const ArrowLeft = styled(MdOutlineKeyboardDoubleArrowLeft)`
  font-size: 1.2rem;
`;

export const ArrowRight = styled(MdOutlineKeyboardDoubleArrowRight)`
  font-size: 1.2rem;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
`;

export const ConfirmText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary || "#555"};
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundSecondary || "#f8f9fa"};
  padding: 1.25rem;
  border-radius: 8px;
  gap: 0.75rem;
  border-left: 3px solid ${({ theme }) => theme.colors.secundary || "#3498db"};
`;

export const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secundary || "#3498db"};
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

export const DataRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const DataLabel = styled.strong`
  min-width: 80px;
  color: ${({ theme }) => theme.colors.textSecondary || "#666"};
  font-weight: 500;
`;

export const DataValue = styled.span`
  flex: 1;
  word-break: break-word;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;