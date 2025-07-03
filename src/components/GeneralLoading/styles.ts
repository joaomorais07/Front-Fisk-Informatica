import { keyframes, styled } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

type GeneralLoadingContainerProps = {
  size: number;
  color?: string;
};

export const GeneralLoadingContainer = styled.div<GeneralLoadingContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  span {
    min-width: ${({ size }) => `${size}px`} !important;
    min-height: ${({ size }) => `${size}px`} !important;
    width: ${({ size }) => `${size}px`} !important;
    height: ${({ size }) => `${size}px`} !important;
    border-radius: 50% !important;
    border-top: 6px solid ${({ color, theme }) => color ?? theme.colors.secundary};
    border-right: 6px solid
      ${({ color, theme }) => color ?? theme.colors.secundary};
    border-bottom: 7px solid transparent;

    animation: ${spin} 1s linear infinite;
  }
`;
