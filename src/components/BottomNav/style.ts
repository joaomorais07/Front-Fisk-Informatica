import styled from "styled-components";

export const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 72px;
  padding: 0 14px;
  background-color: ${({ theme }) => theme.colors.background};
  user-select: none;
  z-index: 1000; /* Para manter acima de outros elementos */
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil no topo */
  
  @media screen and (min-width: 821px) {
    display: none;
  }
`;

export const Section = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

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
  bottom: 64px; /* Para abrir para cima */
  right: -23px;
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
