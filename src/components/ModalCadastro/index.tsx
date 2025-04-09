import React, { ReactNode} from "react";
import CloseButton from "../CloseButton";
import { ConteinerCadastro, CadastroTitle, DivContainer, Backdrop } from "./style";

interface ProfileBarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

const DialogCadastro: React.FC<ProfileBarProps> = ({ isOpen, onClose, title, children }) => {

  return (
    <>
      <Backdrop isOpen={isOpen} />
      <ConteinerCadastro isOpen={isOpen}>
        <CloseButton onClick={onClose} tamanho={25} style={{ color: "black" }} />
        <CadastroTitle>{title}</CadastroTitle>
        {children && <DivContainer>{children}</DivContainer>}
      </ConteinerCadastro>
    </>
  );
};

export default DialogCadastro;
