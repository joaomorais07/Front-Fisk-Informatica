import styled from "styled-components";

export const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  gap: 16px;
  overflow: auto;

  @media (min-width: 1366px) {
    padding: 0;
  }
`;

export const DivTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 16px 24px;
  gap: 16px;
  
  img{
    width: 150px;
  }

`;
