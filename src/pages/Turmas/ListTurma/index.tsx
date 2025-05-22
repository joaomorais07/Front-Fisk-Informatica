import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ListaContainer, Status, Tabela } from "./style";
import { TurmaData } from "../../../utils/types";
import InputField from "../../../components/Inputs/InputField";


function TurmasList() {
  const [turmas, setTurmas] = useState<TurmaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await api.get("/turmas?status=A&status=P");
        setTurmas(response.data);
      } catch (error) {
        toast.error("Erro ao carregar turmas.");
        console.error("Erro ao buscar turmas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTurmas();
  }, []);

  function getStatusLabel(status: string) {
  switch (status) {
    case "A":
      return "Aberta";
    case "P":
      return "Em Progresso";
    case "C":
      return "Concluída" ;
    default:
      return "Desconhecido";
  }
}

  return (
    <ListaContainer>
      {loading ? (
        <p>Carregando...</p>
      ) : turmas.length === 0 ? (
        <p>Nenhuma turma cadastrada.</p>
      ) : (
        <>
          <Tabela>
            <thead>
              <tr>
                <th colSpan={6}>
                  <InputField label="Buscar" />
                </th>
              </tr>
              <tr>
                <th>Nome</th>
                <th>Data Inicio</th>
                <th>Dia</th>
                <th>Alunos</th>
                <th>Status</th>
                <th>Ver mais</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => {
                const statusTraduzido = getStatusLabel(turma.status);
                return (
                  <tr key={turma.id_turma}>
                    <td>{turma.nome_turma}</td>
                    <td>{turma.data_inicio}</td>
                    <td>{turma.dia_semana}</td>
                    <td>{turma.total_alunos}</td>
                    <td><Status status={statusTraduzido}>{getStatusLabel(turma.status)}</Status></td>
                    <td>👁️</td>
                  </tr>
                );
              })}
            </tbody>
          </Tabela>
        </>
      )}
    </ListaContainer>
  );
}

export default TurmasList;
