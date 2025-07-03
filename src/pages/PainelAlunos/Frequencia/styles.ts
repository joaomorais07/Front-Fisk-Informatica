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
  display: flex;
  flex-direction: column;
  margin-bottom:  15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 500px;
`;

export const ToggleButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f8f8;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #eaeaea;
  }
`;

export const GroupTitle = styled.h2`
  margin: 0;
  font-size: 16px;
`;

export const Section = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const TableRow = styled.div`
  display: table-row;
`;

export const TableHeader = styled(TableRow)`
  background: #f0f0f0;
  font-weight: bold;
`;

export const TableCell = styled.div`
  display: table-cell;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  width: 30px;
`;

export const StatusCell = styled(TableCell)<{ status: string }>`
  color: ${(props) => {
    switch (props.status) {
      case "P":
        return "green";
      case "F":
        return "red";
      case "J":
        return "orange";
      default:
        return "black";
    }
  }};
`;

export const Loader = styled.p`
  color: #333;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;
