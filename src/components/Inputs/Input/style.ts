import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.5px;
    color: ${({ theme }) => theme.colors.primary};
  }

  input {
    width: 100%;
    height: 40px;
    padding: 10px 16px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    font-size: 15px;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray};
    }
  }

  span {
    margin-top: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
  }
`;
