import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 400px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

export const GroupContainer = styled.div`
  margin-bottom: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const GroupTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
`;

export const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.div`
  display: table-row;
  font-weight: bold;
  background: #f8f8f8;
`;

export const TableRow = styled.div`
  display: table-row;
  &:nth-child(even) {
    background: #f8f8f8;
  }
`;

export const TableCell = styled.div`
  display: table-cell;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
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
  font-size: 0.8rem;
  color: white;
  background-color: ${({ status }) => (status === "RECEIVED" ? "#2ecc71" : status === "OVERDUE" ? "#e74c3c" : "#f39c12")};
`;

export const Button = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: #2980b9;
  }
`;

export const PaymentSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const QRCodeContainer = styled.div`
  margin: 1rem auto;
  text-align: center;
  img {
    width: 200px;
    height: 200px;
    border: 1px solid #eee;
  }
`;

export const PixCodeWrapper = styled.div`
  position: relative;
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  word-break: break-all;
  code {
    font-size: 0.8rem;
  }
`;


export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PaymentMethodsContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const PaymentFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PaymentInfoSection = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;

  p {
    margin: 0.5rem 0;
    display: flex;
    gap: 0.5rem;

    strong {
      min-width: 80px;
      display: inline-block;
    }
  }
`;

export const ShowAllButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  width: fit-content;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }
`;

export const PaymentModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
`;

export const PaymentMethodSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const QRCodeWrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  padding: 10px;
  background: white;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const PaymentInstruction = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin: 0;
`;

export const PaymentDetails = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DetailItem = styled.p`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  strong {
    min-width: 80px;
    display: inline-block;
  }
`;

export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const PaymentButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
`;

export const PixCodePreview = styled.div`
  background: #f0f0f0;
  padding: 0.8rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  word-break: break-all;
  margin-bottom: 0.5rem;
`;

export const PixCodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

export const CopyButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }

  svg {
    font-size: 0.9rem;
  }
`;
