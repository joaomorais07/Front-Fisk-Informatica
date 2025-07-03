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

export const HeaderFrequencia = styled.header`
  background-color: ${darkTheme.colors.secundary};
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  font-size: 24px;
`;

export const SubTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  padding: 10px 0;
  font-weight: 600;
  color: #333;
`;

export const ErrorMessage = styled.div`
  background-color: #fee;
  border: 1px solid #faa;
  padding: 10px;
  border-radius: 8px;
  color: #a00;
  width: 100%;
  max-width: 600px;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormFrequencia = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
`;

export const InputDate = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
`;

export const AlunoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e5e5;
`;

export const AlunoName = styled.span`
  font-weight: 500;
  color: #444;
`;

export const Radios = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
`;

export const Radio = styled.input`
  cursor: pointer;
  padding: 0.5rem;
`;

export const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background: #2563eb;
  }
`;

export const Loading = styled.div`
  color: #555;
  font-weight: 500;
`;

export const ViewSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #ccc;
  width: 100%;
`;

export const HeaderViewFreq = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  max-width: 600px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
    background-color: ${darkTheme.colors.secundary};
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const NoData = styled.div`
  margin-top: 20px;
  color: #888;
`;
