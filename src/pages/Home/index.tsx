import { HomePageContainer, Container, WelcomeSection } from "./style";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/Auth";
import AlunoDetails from "./Details/alunoDetail";
import DiretorDetails from "./Details/diretorDetail";

import { Navigate } from "react-router-dom";
// ...

function HomePage() {
  const { user, alunoSelecionado } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.tipo.toLocaleLowerCase() === "responsavel" && !alunoSelecionado) {
    return <Navigate to="/selecionar-aluno" />;
  }

  const renderUserContent = () => {
    switch (user.tipo.toLocaleLowerCase()) {
      case "responsavel":
        return <AlunoDetails idAluno={alunoSelecionado!.id} />;
      case "aluno":
        return <AlunoDetails idAluno={user.dados.id} />;
      case "diretor":
        return <DiretorDetails />;
      default:
        return <p>Tipo de usuário não reconhecido</p>;
    }
  };

  return (
    <>
      <Header />
      <HomePageContainer>
        <Container>
          <WelcomeSection>
            <h1>Bem-vindo à Fisk Informática</h1>
            <p>Aqui você acompanha seus cursos, eventos e comunicados.</p>
          </WelcomeSection>
          {renderUserContent()}
        </Container>
      </HomePageContainer>
    </>
  );
}
export default HomePage;
