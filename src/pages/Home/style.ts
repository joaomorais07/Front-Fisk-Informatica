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

export const AlunoCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  gap: 24px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 280px;
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 12px;

  @media screen and (min-width: 768px) {
    margin-right: 24px;
  }
`;

export const ProfileImage = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid ${darkTheme.colors.secundary};
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AlunoInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  text-align: center;

  p {
    margin: 6px 0;
    font-size: 15px;
    color: ${darkTheme.colors.text};

    strong {
      color: ${darkTheme.colors.primary};
    }
  }
`;

export const AlunoIcon = styled.span`
  position: absolute;
  top: 10px;
  left: -30px;
  font-size: 24px;
  color: ${darkTheme.colors.primary};
`;

export const ExtraInfo = styled.div`
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: -webkit-fill-available;

  h1 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    color: ${darkTheme.colors.primary};
    margin-bottom: 4px;
  }

  .divider {
    border-bottom: 1px solid #d0d7de;
    margin-bottom: 8px;
  }
`;

export const AvisoCard = styled.div`
  background-color: #ffffff;
  border-radius: 0 12px 12px 0;
  padding: 16px 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${darkTheme.colors.primary};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f4f8;
  }

  p {
    font-size: 0.95rem;
    color: #333;

    strong {
      font-weight: 600;
      color: ${darkTheme.colors.secundary};
    }
  }
`;

export const NoticeSection = styled.section`
  background-color: #1f1f23;
  padding: 16px;
  border-radius: 12px;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 8px;
    color: ${darkTheme.colors.primary};
  }

  p {
    font-size: 1rem;

    strong {
      color: ${darkTheme.colors.secundary};
    }
  }
`;

export const EventsSection = styled.section`
  h2 {
    font-size: 1.4rem;
    margin-bottom: 12px;
    color: ${darkTheme.colors.primary};
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export const EventCard = styled.div`
  background-color: #29292e;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    margin-bottom: 8px;
    color: ${darkTheme.colors.primary};
  }

  p {
    color: ${darkTheme.colors.textAlt};
  }
`;
