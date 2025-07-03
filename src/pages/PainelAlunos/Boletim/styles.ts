import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
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
  
`;

export const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  position: sticky;
  top: 0;
  border-bottom: 2px solid #e9ecef;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #f1f3f5;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
`;

export const SubjectCell = styled(TableCell)`
  font-weight: 500;
`;

export const GradeCell = styled(TableCell)<{ highlight?: boolean }>`
  font-weight: bold;
  color: ${({ highlight }) => (highlight ? '#4CAF50' : '#495057')};
  text-align: center;
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

export const AverageRow = styled(TableRow)`
  background-color: #f1f8e9 !important;
  font-weight: bold;
`;

export const AverageCell = styled(TableCell)<{ highlight?: boolean }>`
  font-weight: bold;
  color: ${({ highlight }) => (highlight ? '#2E7D32' : '#495057')};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #6c757d;

  svg {
    margin-bottom: 1rem;
    color: #adb5bd;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

export const StatusIndicator = styled.div<{ color: string }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

export const Tooltip = styled.span`
  position: relative;
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::after {
    visibility: visible;
    opacity: 1;
  }
`;