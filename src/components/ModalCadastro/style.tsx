import styled from "styled-components";
import { darkTheme } from "../../themes";

interface ConteinerCadastroProps {
  isOpen: boolean;
}

export const ConteinerCadastro = styled.div<ConteinerCadastroProps>`
  border: 1px solid ${darkTheme.colors.secundary};
  display: ${(props) => (props.isOpen ? "grid" : "none")};
  position: fixed;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  width: 95%;
  max-width: 700px;
  height: auto;
  background-color: whitesmoke;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  pointer-events: auto;
  cursor: default;
  display: flex;
  flex-direction: column;
`;

export const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  overflow: ${({ isOpen }) => (isOpen ? 'hidden' : 'auto')};
`;

export const CadastroTitle = styled.h2`
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  font-size: 22px;
  font-weight: 600;
  color: ${darkTheme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${darkTheme.colors.secundary};
`;

export const DivContainer = styled.div`
  display: grid;
  overflow-y: auto;
  max-height: calc(90vh - 150px); /* Adjust this value as needed */
  padding: 20px;
  flex: 1;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  border: none;
`;

export const ThumbProgresso = styled.div`
  width: 100%;
  height: 8px;
  background-color: #bbbbbb;
  border-radius: 6px;
  position: sticky;
  left: 0;
`;
export const ProgressoRange = styled.div<{ width: number, isComplet:boolean }>`
  height: 8px;
  border: solid 1px white;
  border-radius: 6px;
  background: ${({isComplet}) => (isComplet ? "rgb(20, 255, 20)" : "red")};
  width: ${(props) => props.width}%;
  transition: width 0.5s ease;
  position: absolute;
  bottom: 0;
  left: 0;
`;

