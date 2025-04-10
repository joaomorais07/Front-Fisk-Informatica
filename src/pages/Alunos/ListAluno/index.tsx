import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ListaContainer, Status, Tabela } from "./style";
import { AlunoData } from "../../../utils/types";
import InputField from "../../../components/Inputs/InputField";



function AlunosList() {
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await api.get("/alunos");
        setAlunos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar alunos.");
        console.error("Erro ao buscar alunos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlunos();
  }, []);

  return (
    <ListaContainer>
      {loading ? (
        <p>Carregando...</p>
      ) : alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <Tabela>
          <thead>
            <InputField label="Buscar"/>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Status Matricula</th>
              <th>Ver mais</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id_aluno}>
                <td>{aluno.nome_aluno}</td>
                <td>{aluno.cpf_aluno}</td>
                <td>
                  <Status status={aluno.status_matricula}>{aluno.status_matricula}</Status>
                </td>
                <td>👁️</td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      )}
    </ListaContainer>
  );
}

export default AlunosList;
