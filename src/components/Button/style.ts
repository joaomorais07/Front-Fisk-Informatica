import styled from "styled-components";
import { darkTheme } from "../../themes";

type ButtonProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
  backgroundColor?: string;
  afterColor?: string;
  disabled?: boolean;
  fontSize?: string;
};

export const StyledButton = styled.button<ButtonProps>`
  position: relative;
  width: ${({ width }) => width ?? "100%"};
  min-height: ${({ height }) => height ?? "32px"};
  height: ${({ height }) => height ?? "32px"};
  background-color: ${({ theme }) => theme.colors.secundary};
  color: ${darkTheme.colors.textAlt};
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  font-size: ${({ fontSize }) => fontSize ?? "clamp(20px, 2.8vw, 26px)"};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:after {
    content: "";
    position: absolute;
    top: 17.75%;
    margin: 0 auto;
    width: 87.12%;
    height: 37.5%;
    background-color: ${({ afterColor }) => afterColor};
    border-radius: 40px;
    z-index: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.textAlt};
    font-size: ${({ fontSize }) => fontSize ?? "clamp(14px, 2.5vw, 16px)"};
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.7 : 0.8)};
  }
`;
