import styled from "styled-components";
import { darkTheme } from "../../themes";

export const HomePageContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: 100%;
  @media screen and (min-width: 768px) {
    padding: 32px 80px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  gap: 24px;
  background-color: ${darkTheme.colors.background};
  color: ${darkTheme.colors.text};
  width: 100%;
  max-width: 1580px;
  border-radius: 5px;
`;

export const WelcomeSection = styled.section`
  text-align: center;
  box-shadow: 0 2px 5px #80808047;
  min-height: 100px;

  h1 {
    font-size: 1.8rem;
    margin-bottom: 8px;
    color: ${darkTheme.colors.primary};
  }

  p {
    font-size: 1rem;
    color: ${darkTheme.colors.text};
  }
`;

