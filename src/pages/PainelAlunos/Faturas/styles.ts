import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 400px) {
    padding: 0.5rem;
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

export const GroupContainer = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

export const GroupTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  color: #2c3e50;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

export const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
`;

export const TableHeader = styled.div`
  display: table-row;
  font-weight: bold;
  background: #f8f8f8;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const TableRow = styled.div`
  display: table-row;
  
  &:nth-child(even) {
    background: #f8f8f8;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
  }
`;

export const TableCell = styled.div`
  display: table-cell;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0;
    border-bottom: none;

    &:before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 1rem;
    }
  }

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
`;

export const ValueCell = styled(TableCell)`
  font-weight: bold;
`;

export const DueDateCell = styled(TableCell)<{ status: string }>`
  color: ${({ status }) => (status === "OVERDUE" ? "#e74c3c" : "inherit")};
  font-weight: ${({ status }) => (status === "OVERDUE" ? "bold" : "normal")};
`;

export const StatusPill = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  color: white;
  background-color: ${({ status }) => 
    status === "RECEIVED" ? "#2ecc71" : 
    status === "OVERDUE" ? "#e74c3c" : "#f39c12"};

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const Button = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  white-space: nowrap;

  &:hover {
    background: #2980b9;
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;

export const ShowAllButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding: 0.5rem 0;
  width: fit-content;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    margin-top: 1rem;
    font-size: 0.9rem;
  padding: 0.5rem 0;
  }
`;

export const PaymentModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

export const PaymentMethodSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

export const QRCodeWrapper = styled.div`
  width: 160px;
  height: 160px;
  border: 1px solid #eee;
  padding: 8px;
  background: white;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
    padding: 10px;
  }
`;

export const PaymentInstruction = styled.p`
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  margin: 0;
  max-width: 300px;

  @media (min-width: 768px) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`;

export const PaymentDetails = styled.div`
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export const DetailItem = styled.p`
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  strong {
    min-width: 70px;
    display: inline-block;
  }

  @media (min-width: 768px) {
    margin: 0.5rem 0;
    font-size: 1rem;

    strong {
      min-width: 80px;
    }
  }
`;

export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const PaymentButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const PixCodePreview = styled.div`
  background: #f0f0f0;
  padding: 0.6rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  word-break: break-all;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 300px;

  @media (min-width: 768px) {
    padding: 0.8rem;
    font-size: 0.85rem;
    max-width: 100%;
  }
`;

export const PixCodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.75rem 0;
  gap: 0.5rem;

  @media (min-width: 768px) {
    margin: 1rem 0;
    gap: 0.75rem;
  }
`;

export const CopyButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }

  svg {
    font-size: 0.85rem;
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;

    svg {
      font-size: 0.9rem;
    }
  }
`;