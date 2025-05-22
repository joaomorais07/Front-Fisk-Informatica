import styled from "styled-components";

export const ContainerSelect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px 100px;
  background: linear-gradient(135deg, #f5f8fc 0%, #ffffff 100%);
  min-height: 100vh;

  .selecionar-aluno-container {
    width: 100%;
    max-width: 800px;
    text-align: center;
    display: flex ;
    flex-direction: column;
    align-items: center;
    gap: 20px;


    h2 {
      font-size: 2.2rem;
      color: #222;
      margin-bottom: 40px;
    }

    .alunos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      justify-items: center;
    }

    .aluno-card {
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      width: 100%;
      max-width: 260px;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        background-color: #f0f8ff;
      }

      .avatar {
        width: 60px;
        height: 60px;
        background-color: #5b92e5;
        color: white;
        font-size: 1.8rem;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
      }

      p {
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        text-align: center;
        word-break: break-word;
      }
    }
  }
`;
