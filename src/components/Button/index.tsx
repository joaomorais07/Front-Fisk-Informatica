import { ReactNode } from "react";
import { StyledButton } from "./style";
import { useTheme } from "styled-components";
import GeneralLoading from "../GeneralLoading";

type ButtonProps = {
  children: ReactNode;
  id?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  disabled?: boolean;
  fontSize?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

function Button(props: ButtonProps) {
  const colors = useTheme().colors;

  const { isLoading, disabled, ...rest } = props;

  const finalProps = {
    ...rest,
    backgroundColor: colors.darkGreen,
    afterColor: colors.lightGreen,
  };

  return (
    <StyledButton {...finalProps} disabled={isLoading || disabled}>
      {isLoading ? <GeneralLoading /> : <span>{props.children}</span>}
    </StyledButton>
  );
}

export default Button;
