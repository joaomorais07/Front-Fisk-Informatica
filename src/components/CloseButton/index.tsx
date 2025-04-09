import React from "react";
import { StyledCloseButton } from "./styles"; // Importe o componente estilizado
import { MdClose } from "react-icons/md";

interface CloseButtonProps {
  onClick: () => void; 
  tamanho: number; 
  style?: React.CSSProperties;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, tamanho, style }) => {
  return (
    <StyledCloseButton onClick={onClick} style={style}> 
      <MdClose size={tamanho} /> 
    </StyledCloseButton>
  );
};

export default CloseButton;
