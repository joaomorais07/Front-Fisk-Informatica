import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 72px;
  min-height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const HeaderContent = styled.div`
  width: 100%;

  height: 100%; // Ocupa toda a altura do HeaderContainer
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center; // Centraliza verticalmente
  justify-content: space-between; // Distribui os itens horizontalmente

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto 1fr;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 2;

  @media (min-width: 768px) {
    grid-column: 1;
    justify-content: flex-start;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

export const NavSection = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
    grid-column: 2;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center; // Centraliza verticalmente os itens da navegação
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%; // Ocupa toda a altura disponível
`;

export const NavLink = styled(Link)<{ $isActive: boolean; $userType?: string }>`
  color: ${({ theme, $isActive, $userType }) => 
  $isActive 
      ? ["aluno", "responsavel"].includes($userType ?? "") 
        ? theme.colors.primary 
        : theme.colors.secundary
      : theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme, $userType }) => 
      ["aluno", "responsavel"].includes($userType ?? "") 
        ? theme.colors.primary 
        : theme.colors.secundary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme, $userType }) => 
      ["aluno", "responsavel"].includes($userType ?? "") 
        ? theme.colors.primary 
        : theme.colors.secundary};
    transition: width 0.2s ease;
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  grid-column: 1;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNav = styled.div`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavLink = styled(Link)<{ $isActive: boolean, $userType?: string }>`
  color: ${({ theme, $isActive, $userType }) => 
  $isActive 
      ? ["aluno", "responsavel"].includes($userType ?? "") 
        ? theme.colors.primary 
        : theme.colors.secundary
      : theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme, $userType }) => 
      ["aluno", "responsavel"].includes($userType ?? "") 
        ? theme.colors.primary 
        : theme.colors.secundary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme, $userType }) => 
      ["aluno", "responsavel"].includes($userType ?? "") 
        ? theme.colors.primary 
        : theme.colors.secundary};
    transition: width 0.2s ease;
  }
`;

export const UserMenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 3;
`;

export const UserMenuButton = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center; // Centraliza verticalmente a imagem
  height: 100%; // Ocupa toda a altura disponível
`;

export const UserAvatar = styled.img<{ $userType?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme, $userType }) => 
    ["aluno", "responsavel"].includes($userType ?? "") 
      ? theme.colors.primary 
      : theme.colors.secundary};
`;


export const DropdownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: -10px;
  top: 72px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  min-width: 200px;
  overflow: hidden;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavItemWithDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
  padding: 8px 0;
`;

export const DropdownLink = styled(NavLink)`
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  
  &:hover {
    background-color: #f1f1f1;
  }
`;