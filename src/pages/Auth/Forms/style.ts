import styled from "styled-components";

export const AuthFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  gap: 12px;
`;

export const AuthForm = styled.form`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 500px);
  padding: 36px min(6%, 48px) 48px;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    margin-bottom: 24px;
  }

  span {
    &.error {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const AuthFormLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  font-size: 14px;

  a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;


export const DivInputPassword = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const PasswordToggle = styled.div`
  position: absolute;
  width: min-content;
  padding: 2px;
  right: 8px;
  top: 30px;
  cursor: pointer;
`;

export const UserSelector = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const UserOption = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.background};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.textAlt : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 8px 16px;
  width: 150px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.white};
  }
`;