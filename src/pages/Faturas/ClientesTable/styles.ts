import styled from "styled-components";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { darkTheme } from "../../../themes";

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
  background: ${darkTheme.colors.textAlt};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 20px;

  thead th {
    padding: 1rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.secundary};
    color: white;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    position: sticky;
    top: 0;
  }
  th {
    background: ${darkTheme.colors.secundary};
    color: white;
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

    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      text-align: center;
    }
  }

  tfoot td {
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#f9f9f9"};
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
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
    background-color: ${({ active, theme }) => (active ? theme.colors.secondaryDark : theme.colors.hoverBackground || "#e9ecef")};
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
    background: ${({ theme }) => theme.colors.secundary || "#2ecc71"};
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
      background: ${({ theme }) => theme.colors.secondaryDark || "#27ae60"};
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const SearchContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
`;

export const ArrowLeft = styled(MdOutlineKeyboardDoubleArrowLeft)`
  font-size: 1.2rem;
`;

export const ArrowRight = styled(MdOutlineKeyboardDoubleArrowRight)`
  font-size: 1.2rem;
`;

export const ClienteRow = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground || "#f5f5f5"};
  }
`;

export const ExpandableRow = styled.tr`
  td {
    padding: 0 !important;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#f8f9fa"};

    > div {
      padding: 1rem;
      border-top: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
    }
  }
`;

export const ParcelaHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  margin-bottom: 0.5rem;
`;

export const ParcelaItem = styled.div`
  margin-bottom: 0.5rem;
`;

export const ParcelaDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 0.5rem;

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.primary || "#3498db"};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.textSecondary || "#999"};
      cursor: not-allowed;
      text-decoration: none;
    }
  }
`;

export const ActionButton = styled.button<{ expanded?: boolean }>`
  background: ${({ theme }) => theme.colors.primary || "#3498db"};
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

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark || "#2980b9"};
    transform: translateY(-1px);
  }
`;

export const SectionDivider = styled.td`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#f8f9fa"};
  padding: 0.5rem 1rem !important;
  font-weight: 600;
  border-left: 3px solid ${({ theme }) => theme.colors.primary || "#3498db"};
`;

export const SectionTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

export const ParcelasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary || "#3498db"};
  }

  p {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.textSecondary || "#666"};
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundSecondary || "#f8f9fa"};
  border-radius: 8px;
`;

export const FilterOption = styled.div<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ active, theme }) => (active ? theme.colors.secundary || "#3498db" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#666")};
  transition: all 0.2s;
  font-weight: ${({ active }) => (active ? "600" : "500")};

  &:hover {
    background-color: ${({ active, theme }) => !active && (theme.colors.hoverBackground || "#e0e0e0")};
  }
`;

export const ParcelasModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;

  .assinatura-info {
    h4 {
      margin: 0;
      color: ${({ theme }) => theme.colors.primary || "#3498db"};
      font-size: 1.2rem;
    }
    p {
      margin: 0.5rem 0 0 0;
      color: ${({ theme }) => theme.colors.textSecondary || "#666"};
    }
  }

  .parcelas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    max-height: 60vh;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .parcela-card {
    border: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .parcela-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .parcela-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }

  .parcela-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  }
`;

export const Status = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "error":
        return theme.colors.error || "#e74c3c";
      case "success":
        return theme.colors.success || "#2ecc71";
      case "warning":
        return theme.colors.warning || "#f39c12";
      default:
        return theme.colors.textSecondary || "#666";
    }
  }};
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


export const PagamentoModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;

  h1 {
    margin: 0;
    text-align: center;
    
    strong {
      color: ${({ theme }) => theme.colors.secundary || "#3498db"};
      font-weight: 600;
      font-size: 1.1rem;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .form-group label {
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  .form-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .payment-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  .pix-section {
    border: 1px solid #e9ecef;
  }

  .qr-code-container {
    padding: 1rem;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
  }

  .qr-code {
    width: 180px;
    height: 180px;
    object-fit: contain;
  }

  .payment-instruction {
    font-size: 0.85rem;
    color: #6c757d;
    text-align: center;
    margin: 0;
  }

  button {
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .pix-code-container {
    width: 100%;
    margin: 1rem 0;
  }

  .pix-code-wrapper {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 0.5rem;
    position: relative;
    width: 100%;
  }

  .pix-code {
    flex-grow: 1;
    font-family: monospace;
    font-size: 0.85rem;
    color: #495057;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 0.5rem;
  }

  .copy-button {
    background: #e9ecef;
    border: none;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    position: relative;

    &:hover {
      background: #dee2e6;
    }

    &.copied {
      background: #28a745;
      color: white;

      .tooltip::after {
        content: "Copiado!";
      }
    }
  }

  .tooltip {
    position: relative;

    &::after {
      content: "Copiar";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 130%;
      margin-top: 5px;
      background: #333;
      color: white;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover::after {
      opacity: 1;
    }
  }
`;
