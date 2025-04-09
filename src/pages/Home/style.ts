import styled from "styled-components";
import { darkTheme } from "../../themes";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  gap: 16px;
  overflow: auto;

  
`;

export const DivAvisos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background-color: rgb(16, 16, 19);
  border-radius: 8px;
  padding: 15px;
  h1{
    font-size: 1.2rem;
  }

  p strong{
    font-weight: 700;
    color: ${darkTheme.colors.primary}
  }
`;

export const HomePageFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  gap: 16px;
`;

export const EventsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  width: 100%;
  gap: 16px;
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
  }

  @media screen and (min-width: 1024px) {
    padding-right: 16px;
  }
`;
