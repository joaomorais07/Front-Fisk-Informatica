import styled from "styled-components";

export const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
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
  gap: 16px;
  padding: 20px;
  
  img{
    width: 120px;

    @media (max-width: 500px) {
    width: 100px;
  }
  }

`;
