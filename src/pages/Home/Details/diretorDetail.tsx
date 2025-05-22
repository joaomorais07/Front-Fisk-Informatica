import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/Auth";
import {
  DiretorCard,
  LeftSection,
  ProfileImage,
  RightSection,
  InfoBlock,
  AvisoCard,
  GestaoSection,
} from "./stylesDetail";
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
    <DiretorCard>
      <LeftSection>
        <ProfileImage src={diretor.foto_diretor || "/default_profile.png"} alt="Foto perfil" />
        <InfoBlock>
          <p>
            <strong>Nome:</strong> {user?.dados.nome || "Não informado"}
          </p>
          <p>
            <strong>Cargo:</strong> Diretor Geral
          </p>
        </InfoBlock>
      </LeftSection>

      <RightSection>
        <GestaoSection>
          <h1>
            Painel de Gestão <BsGearFill />
          </h1>
          <div className="divider" />

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
      </RightSection>
    </DiretorCard>
  );
}
