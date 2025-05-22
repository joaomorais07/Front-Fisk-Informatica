// src/pages/Home/Details/alunoDetail.tsx

import { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import {
  AlunoCard,
  LeftSection,
  ProfileImage,
  RightSection,
  AlunoInfo,
  ExtraInfo,
  AvisoCard,
  EventsSection,
  EventCard,
} from "./stylesDetail";
import { api } from "../../../services/api";
import { AlunoData } from "../../../utils/types";

interface AlunoDetailsProps {
  idAluno: number;
}

export default function AlunoDetails({ idAluno }: AlunoDetailsProps) {
  const [aluno, setAluno] = useState<AlunoData | null>(null);

  useEffect(() => {
    async function fetchAluno() {
      try {
        const response = await api.get(`/alunos/${idAluno}`);
        console.log("Aluno:", response.data);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    }

    fetchAluno();
  }, [idAluno]);

  if (!aluno) return <p>Carregando dados do aluno...</p>;

  return (
    <AlunoCard>
      <LeftSection>
        <ProfileImage
          src={aluno.foto_aluno || "/Front-Fisk-Informatica/assets/profile/default.png"}
          alt="Foto de perfil"
        />
        <AlunoInfo>
          <p><strong>Nome:</strong> {aluno.nome_aluno}</p>
          <p><strong>Curso:</strong>Informatica</p>
          <p><strong>Status:</strong> {aluno.status_matricula}</p>
        </AlunoInfo>
      </LeftSection>

      <RightSection>
        <ExtraInfo>
          <h1>
            Avisos <BsBellFill />
          </h1>
          <div className="divider" />
          {/* {aluno.avisos.map((aviso, index) => (
            <AvisoCard key={index}>
              <p>{aviso}</p>
            </AvisoCard>
          ))} */}
        </ExtraInfo>
      </RightSection>

      <EventsSection>
        <h2>Cursos em andamento</h2>
        <div className="cards">
          {/* {aluno.cursos.map((curso, index) => (
            <EventCard key={index}>
              <h3>{curso.nome}</h3>
              <p>Progresso: {curso.progresso}%</p>
            </EventCard>
          ))} */}
        </div>
      </EventsSection>
    </AlunoCard>
  );
}
