import styled from "styled-components";

export const ContainerSelect = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8fc 0%, #ffffff 100%);
  padding: 2rem 1rem;
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2.5rem;
  }

  .logo {
    max-width: 100px;
    height: auto;
    @media (min-width: 768px) {
      max-width: 130px;
    }
  }

  .selecionar-aluno-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      color: #2c3e50;
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      line-height: 1.3;

      @media (min-width: 768px) {
        font-size: 2rem;
      }
    }

    p {
      color: #7f8c8d;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
    }
  }

  .alunos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  .aluno-card {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-color: #5b92e5;
    }
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;

    @media (min-width: 768px) {
      width: 70px;
      height: 70px;
      font-size: 1.75rem;
    }
  }

  .aluno-card h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .enter-hint {
    color: #7f8c8d;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .fade-out {
    animation: fadeOut 0.3s ease-out forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;
