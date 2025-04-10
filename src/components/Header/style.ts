import { Link } from "react-router-dom";
import styled from "styled-components";


export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 72px;
  padding: 0 14px;
  background-color: ${({ theme }) => theme.colors.background};
  user-select: none;

  @media screen and (min-width: 480px) {
    padding: 0 34px;
  }

  @media screen and (min-width: 1024px) {
    padding: 16px 34px;
  }
`;

export const HeaderLogo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  text-transform: uppercase;
  
  img{
    width: 100px;
  }


`;

export const Section = styled.div`
  width: 100%;
  gap: 40px;

  @media screen and (max-width: 821px) {
    display: none;
  }
`;

export const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    p {
      font-size: 14px;
    }
    img {
      width: 35px;
      border-radius: 50%;
    }
  }

  svg {
    padding: 2px;
  }
`;

export const MenuSuspenso = styled.ul`
  position: absolute;
  top: 71px; /* Para abrir para cima */
  right: -29px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary || "#fff"};
  border: 1px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 200px;
  padding: 10px 0;
  list-style: none;
  z-index: 10;

  li {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textPrimary || "#333"};
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverBackground || "#f1f1f1"};
    }

    svg {
      margin-right: 8px;
    }

    span {
      flex-grow: 1;
      text-align: left;
    }
  }
`;


export const SectionMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg{
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;

    &:hover{
      background-color: rgb(48, 48, 48);
    }
  }
  @media screen and (min-width: 821px) {
    display: none;
  }
`;

