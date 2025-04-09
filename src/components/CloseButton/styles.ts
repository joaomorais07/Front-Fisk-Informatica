import styled from "styled-components";
import { darkTheme } from "../../themes";

export const StyledCloseButton = styled.button`
  color: ${darkTheme.colors.textAlt};
  background-color: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  padding: 2px;

  &:hover {
    border-radius: 5px;
    background-color: #494949ad;
  }
`;
