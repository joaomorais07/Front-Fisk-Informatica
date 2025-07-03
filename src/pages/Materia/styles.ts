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

export const HeaderMateria = styled.header`
  background-color: ${darkTheme.colors.secundary};
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const MateriaList = styled.div`
  max-width: 1200px;
  margin: 0 auto; /* Centraliza o grid */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const MateriaCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
`;

export const Option = styled.div`
  color: #111;
  cursor: pointer;
  transition: color 0.3s;
  border-radius: 50%;
  padding: 5px;

  &:hover {
    background-color: #888;
  }
`;
