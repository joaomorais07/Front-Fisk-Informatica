import styled from "styled-components";
import { darkTheme } from "../../../themes";

export const DiretorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;

  @media screen and (min-width: 992px) {
    width: 300px;
    position: sticky;
    top: 20px;
  }
`;

export const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${darkTheme.colors.primary};
  margin-bottom: 20px;
`;

export const ProfileInfo = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.5rem;
    color: ${darkTheme.colors.primary};
    margin-bottom: 16px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #eee;

    .label {
      font-weight: 600;
      color: ${darkTheme.colors.text};
    }

    .value {
      color: #555;
    }
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const GestaoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  color: ${darkTheme.colors.primary};
  margin-top: 0;
  margin-bottom: 16px;

  svg {
    color: ${darkTheme.colors.secundary};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
  margin: 8px 0 16px;
`;

export const AvisoCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${darkTheme.colors.secundary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  p {
    margin: 0;
    color: ${darkTheme.colors.text};

    strong {
      color: ${darkTheme.colors.primary};
    }
  }
`;