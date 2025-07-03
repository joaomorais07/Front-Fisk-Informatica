import styled from "styled-components";

interface StatusProps {
  status: string;
}

interface TabButtonProps {
  active: boolean;
}

interface PageButtonProps {
  active?: boolean;
}

interface MetricCardProps {
  color?: string;
}

export const ListaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  background: ${({ theme }) => theme.colors.background || "#f8f9fa"};
`;

export const TabSwitcherContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary || "#f8f9fa"};
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: fit-content;
  margin: auto;
`;

export const TabButton = styled.button<TabButtonProps>`
  padding: 0.75rem 2rem;
  background: ${({ active, theme }) => (active ? theme.colors.secundary || "#3498db" : "transparent")};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.secundary || "#6c757d")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  margin: 0 0.25rem;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &:hover {
    background: ${({ active, theme }) => !active && (theme.colors.hoverBackground || "rgba(0, 0, 0, 0.05)")};
    color: ${({ active, theme }) => !active && theme.colors.text};
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* Layout principal: métricas | gráfico */
  gap: 1.5rem;
  width: 100%;

  > div:first-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 colunas para métricas */
    gap: 1rem;
    align-content: start;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;

    > div:first-child {
      grid-template-columns: repeat(4, 1fr); /* 4 colunas quando espaço */
    }
  }

  @media (max-width: 768px) {
    > div:first-child {
      grid-template-columns: repeat(2, 1fr); /* 2 colunas em telas médias */
    }
  }

  @media (max-width: 480px) {
    > div:first-child {
      grid-template-columns: 1fr; /* 1 coluna em telas pequenas */
    }
  }
`;

export const MetricCard = styled.div<MetricCardProps>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundSecondary || "#fff"};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid ${({ color }) => color || "#3498db"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary || "#6c757d"};
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  p {
    color: ${({ theme }) => theme.colors.text || "#212529"};
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 100%;
`;