import {
  HomePageContainer,
  Container,
  WelcomeSection,
  AlunoCard,
  LeftSection,
  ProfileImage,
  RightSection,
  AlunoInfo,
  AlunoIcon,
  ExtraInfo,
  NoticeSection,
  EventsSection,
  EventCard,
  AvisoCard,
} from "./style";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { BsBellFill } from "react-icons/bs";

function HomePage() {
  return (
    <>
      <Header />
      <HomePageContainer>
        <Container>
          <WelcomeSection>
            <h1>Bem-vindo à Fisk Informática</h1>
            <p>Aqui você acompanha seus cursos, eventos e comunicados.</p>
          </WelcomeSection>

          <AlunoCard>
            <LeftSection>
              <ProfileImage src="/assets/images/Foto_Perfil.png" alt="Ft perfil" />
              <AlunoInfo>
                <p>
                  <strong>Nome:</strong> Fabiana Santana
                </p>
                <p>
                  <strong>Curso:</strong> Excel Avançado
                </p>
                <p>
                  <strong>Status:</strong> Ativo
                </p>
              </AlunoInfo>
            </LeftSection>

            <RightSection>
              <ExtraInfo>
                <h1>
                  Avisos <BsBellFill />
                </h1>
                <div className="divider" />

                <AvisoCard>
                  <p>
                    <strong>Aula de sábado cancelada:</strong> Devido ao feriado, a aula do dia 20/04 foi cancelada.
                  </p>
                </AvisoCard>

                <AvisoCard>
                  <p>
                    <strong>Prova:</strong> Teremos prova de Excel dia 25/04/2025.
                  </p>
                </AvisoCard>
              </ExtraInfo>
            </RightSection>
          </AlunoCard>

          <EventsSection>
            <h2>Cursos em andamento</h2>
            <div className="cards">
              <EventCard>
                <h3>Informática Básica</h3>
                <p>Progresso: 60%</p>
              </EventCard>
              <EventCard>
                <h3>Excel Avançado</h3>
                <p>Progresso: 30%</p>
              </EventCard>
            </div>
          </EventsSection>
        </Container>
      </HomePageContainer>
      <BottomNav />
    </>
  );
}

export default HomePage;
