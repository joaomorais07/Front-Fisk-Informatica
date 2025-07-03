import { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import {
  AlunoContainer,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  MainContent,
  InfoCard,
  AvisosSection,
  CursosSection,
  SectionTitle,
  Divider,
  StatusBadge,
} from "./stylesAluno";
import { api } from "../../../services/api";
import { AlunoData } from "../../../utils/types";

interface AlunoDetailsProps {
  idAluno: number;
}

export default function AlunoDetails({ idAluno }: AlunoDetailsProps) {
  const [aluno, setAluno] = useState<AlunoData | null>(null);

  function traduzirStatus(status: string) {
    switch (status) {
      case "N":
        return "Não Matriculado";
      case "A":
        return "Ativo";
      case "T":
        return "Trancado";
      case "C":
        return "Cancelado";
      case "F":
        return "Finalizado";
      case "P":
        return "Pendente";
      default:
        return "Desconhecido";
    }
  }

  useEffect(() => {
    async function fetchAluno() {
      try {
        const response = await api.get(`/alunos/${idAluno}`);
        console.log("Dados do aluno:", response.data);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    }

    fetchAluno();
  }, [idAluno]);

  if (!aluno) return <p>Carregando dados do aluno...</p>;

  return (
    <AlunoContainer>
      <ProfileSection>
        <ProfileImage src={aluno.foto_aluno || "/Front-Fisk-Informatica/assets/profile/default.png"} alt="Foto de perfil" />
        <ProfileInfo>
          <h2>{aluno.nome_aluno}</h2>
          <div className="info-row">
            <span className="label">Curso:</span>
            <span className="value">
              {aluno.curso && aluno.curso.length > 0
                ? aluno.curso.map((curso, index) => (
                    <span key={index}>
                      {curso.nome_curso?.toUpperCase() ?? "CURSO DESCONHECIDO"}
                      {index < aluno.curso.length - 1 && ", "}
                    </span>
                  ))
                : "Curso desconhecido"}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <StatusBadge status={aluno.status_matricula}>{traduzirStatus(aluno.status_matricula)}</StatusBadge>
          </div>
        </ProfileInfo>
      </ProfileSection>

      <MainContent>
        <InfoCard>
          <AvisosSection>
            <SectionTitle>
              <BsBellFill />
              <span>Avisos</span>
            </SectionTitle>
            <Divider />

            <div className="aviso-item">
              <p>📌 Prova de Excel será na próxima terça-feira às 14h.</p>
            </div>
            <div className="aviso-item">
              <p>📝 Entrega do trabalho de PowerPoint até sexta-feira.</p>
            </div>
          </AvisosSection>
        </InfoCard>

        <CursosSection>
          <SectionTitle>Cursos em Andamento</SectionTitle>
          <Divider />
          <div className="cursos-grid">
            {aluno.curso.map((curso, index) => (
              <div key={index} className="curso-card">
                <section className="curso-header">
                  <strong>Curso: </strong>
                  <h3>{curso.nome_curso?.toUpperCase() ?? "Curso desconhecido"}</h3>
                </section>
                <div className="progress-bar">
                  <div style={{ width: `${curso.progresso_curso ?? 0}%` }}></div>
                </div>
                <span>{curso.progresso_curso ?? 0}% completo</span>
              </div>
            ))}
          </div>
        </CursosSection>
      </MainContent>
    </AlunoContainer>
  );
}
