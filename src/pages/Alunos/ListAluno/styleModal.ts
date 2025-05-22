// src/components/Modal/styles.ts
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  font-family: "Segoe UI", sans-serif;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  color: #333;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    h2 {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }

  .section {
    margin-bottom: 30px;
    border-left: 4px solid #007b83;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .section h3 {
    font-size: 1.2rem;
    color: #007b83;
    margin-bottom: 10px;
  }

  .info-item {
    margin-bottom: 8px;
    gap: 5px;
  }

  .label {
    font-weight: 600;
    display: block;
    font-size: 1rem;
  }

  .value {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
