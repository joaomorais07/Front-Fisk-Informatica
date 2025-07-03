import styled from "styled-components";
import { darkTheme } from "../../../themes";

export const AlunoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 1000px;
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
  width: 200px;
  height: 200px;
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
    gap: 8px;
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

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${({ status }) => (status === "A" ? "#e6f7ee" : status === "I" ? "#fff3e0" : "#ffebee")};
  color: ${({ status }) => (status === "A" ? "#2e7d32" : status === "I" ? "#e65100" : "#c62828")};
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoCard = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const AvisosSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .aviso-item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }

    p {
      margin: 0;
      color: ${darkTheme.colors.text};
    }
  }
`;

export const CursosSection = styled(InfoCard)`
  display: flex;
  flex-direction: column;
  width: 100%;
  .cursos-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
  }

  .curso-card {
    background: #f8f9fa;
    width: 100%;
    min-width: 150px;
    border-radius: 12px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    h3 {
      color: ${darkTheme.colors.primary};
      font-size: 1.25rem;
      margin: 0;
    }
    .curso-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 8px;
      strong {
        font-weight: 600;
        color: ${darkTheme.colors.text};
      }

      h3 {
        font-size: 1rem;
        color: ${darkTheme.colors.text};
      }
    }

    .progress-bar {
      height: 10px;
      background: #e0e0e0;
      border-radius: 5px;
      overflow: hidden;

      div {
        height: 100%;
        background: ${darkTheme.colors.primary};
        transition: width 0.4s ease;
      }
    }

    span {
      font-size: 0.9rem;
      color: #555;
    }
  }
`;

export const SectionTitle = styled.h2`
  width: 100%;
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
