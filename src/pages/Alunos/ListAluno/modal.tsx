// src/components/Modal/index.tsx
import React from "react";
import { ModalOverlay, ModalContent, Container } from "./styleModal";
import CloseButton from "../../../components/CloseButton";


interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          <CloseButton onClick={onClose} tamanho={25}  style={{ color: "black", marginTop:"12px" }} />
        </header>
        <Container>{children}</Container>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
