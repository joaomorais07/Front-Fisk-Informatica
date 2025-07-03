import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/Auth";
import {
  DiretorContainer,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  MainContent,
  GestaoSection,
  SectionTitle,
  Divider,
  AvisoCard,
  InfoCard,
} from "./stylesDiretor";
import { BsGearFill } from "react-icons/bs";
import { api } from "../../../services/api";
import { DiretoData } from "../../../utils/types";

export default function DiretorDetails() {
  const { user } = useAuth();
  const [diretor, setDiretor] = useState<DiretoData | null>(null);

  useEffect(() => {
    const fetchDiretor = async () => {
      if (!user?.dados.id) return;

      try {
        const response = await api.get(`diretor/${user.dados.id}`);
        setDiretor(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do diretor:", error);
      }
    };

    fetchDiretor();
  }, [user?.dados.id]);

  if (!diretor) return <p>Carregando dados do diretor...</p>;

  return (
    <DiretorContainer>
      <ProfileSection>
        <ProfileImage src={diretor.foto_diretor || "/default_profile.png"} alt="Foto perfil" />
        <ProfileInfo>
          <h2>{user?.dados.nome || "Não informado"}</h2>
          <div className="info-row">
            <span className="label">Cargo:</span>
            <span className="value">Diretor Geral</span>
          </div>
          <div className="info-row">
            <span className="label">Matrícula:</span>
            <span className="value">{user?.dados.id}</span>
          </div>
        </ProfileInfo>
      </ProfileSection>

      <MainContent>
        <InfoCard>
          <GestaoSection>
            <SectionTitle>
              <BsGearFill />
              <span>Painel de Gestão</span>
            </SectionTitle>
            <Divider />

            <AvisoCard>
              <p>
                <strong>Relatório mensal disponível:</strong> O relatório de abril já está disponível no painel administrativo.
              </p>
            </AvisoCard>

            <AvisoCard>
              <p>
                <strong>Curso novo cadastrado:</strong> Power BI Intermediário foi adicionado à grade.
              </p>
            </AvisoCard>

            <AvisoCard>
              <p>
                <strong>Reunião agendada:</strong> Diretores e coordenadores no dia 05/05 às 14h.
              </p>
            </AvisoCard>
          </GestaoSection>
        </InfoCard>
      </MainContent>
    </DiretorContainer>
  );
}
