import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { ListaContainer, Options, Status, Tabela } from "./style";
import { AlunoData } from "../../../utils/types";
import InputField from "../../../components/Inputs/InputField";
import Modal from "./modal";
import { FaTrashAlt } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";

// Função para traduzir o status
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

// Função para formatar CPF
function formatarCPF(cpf: string | null) {
  if (!cpf) return "Não informado";
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return cpf;
  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function AlunosList() {
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAluno, setModalAluno] = useState<AlunoData | null>(null);
  const [modalStatusAluno, setModalStatusAluno] = useState<AlunoData | null>(null);
  const [novoStatus, setNovoStatus] = useState<string>("");

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await api.get("/alunos/listarAlunos");
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

  const handleTransferirAluno = async (id_aluno: number) => {
    try {
      await api.put(`/alunos/transferir/${id_aluno}`);
      toast.success("Aluno transferido com sucesso!");
      setModalAluno(null);
    } catch (error) {
      toast.error("Erro ao transferir aluno.");
      console.error("Transferência falhou:", error);
    }
  };

  const handleAtualizarStatusMatricula = async () => {
    if (!modalStatusAluno) return;
    try {
      await api.put(`/alunos/atualizarMatricula/${modalStatusAluno.id_aluno}`, { status_matricula: novoStatus });
      toast.success("Status atualizado com sucesso!");
      setModalStatusAluno(null);
      setModalAluno(null);
      const { data } = await api.get("/alunos/listarAlunos");
      setAlunos(data);
    } catch (error) {
      toast.error("Erro ao atualizar status.");
      console.error("Atualização de status falhou:", error);
    }
  };

  const handleExcluirAluno = async (id_aluno: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) return;
    try {
      await api.delete(`/alunos/${id_aluno}`);
      toast.success("Aluno excluído com sucesso!");
      setModalAluno(null);
      setAlunos((prev) => prev.filter((a) => Number(a.id_aluno) !== id_aluno));
    } catch (error) {
      toast.error("Erro ao excluir aluno.");
      console.error("Exclusão falhou:", error);
    }
  };

  return (
    <ListaContainer>
      {loading ? (
        <p>Carregando...</p>
      ) : alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <>
          <Tabela>
            <thead>
              <tr>
                <th colSpan={5}>
                  <InputField label="Buscar" />
                </th>
              </tr>
              <tr>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>CPF</th>
                <th>Status Matrícula</th>
                <th>Ver mais</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id_aluno}>
                  <td>{aluno.nome_aluno}</td>
                  <td>{aluno.data_nascimento}</td>
                  <td>{formatarCPF(aluno.cpf_aluno)}</td>
                  <td>
                    <Status status={traduzirStatus(aluno.status_matricula)}>
                      {traduzirStatus(aluno.status_matricula)}
                    </Status>
                  </td>
                  <td>
                    <button
                      onClick={() => setModalAluno(aluno)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Tabela>

          {modalAluno && (
            <Modal onClose={() => setModalAluno(null)} title="Detalhes do Aluno">
              <div className="section">
                <h3>Dados do Aluno</h3>
                <div className="info-item">
                  <span className="label">Nome:</span>
                  <span className="value">{modalAluno.nome_aluno}</span>
                </div>
                <div className="info-item">
                  <span className="label">CPF:</span>
                  <span className="value">{formatarCPF(modalAluno.cpf_aluno) || "Não informado"}</span>
                </div>
                <div className="info-item">
                  <span className="label">Telefone:</span>
                  <span className="value">{modalAluno.telefone_aluno || "Não informado"}</span>
                </div>
                <div className="info-item">
                  <span className="label">Sexo:</span>
                  <span className="value">{modalAluno.sexo}</span>
                </div>
                <div className="info-item">
                  <span className="label">Data de Nascimento:</span>
                  <span className="value">{modalAluno.data_nascimento}</span>
                </div>
                <div className="info-item">
                  <span className="label">Status da Matrícula:</span>
                  <span className="value">{traduzirStatus(modalAluno.status_matricula)}</span>
                </div>
              </div>

              <div className="section">
                <h3>Responsável</h3>
                {modalAluno.tem_responsavel ? (
                  <>
                    <div className="info-item">
                      <span className="label">Nome:</span>
                      <span className="value">{modalAluno.responsavel?.nome_responsavel || "Não informado"}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">CPF:</span>
                      <span className="value">{formatarCPF(modalAluno.responsavel?.cpf_responsavel) || "Não informado"}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Telefone:</span>
                      <span className="value">{modalAluno.responsavel?.telefone_responsavel || "Não informado"}</span>
                    </div>
                  </>
                ) : (
                  <p>Sem responsável</p>
                )}
              </div>

              <div className="section">
                <h3>Endereço</h3>
                <div className="info-item">
                  <span className="label">Estado:</span>
                  <span className="value">{modalAluno.endereco.estado}</span>
                </div>
                <div className="info-item">
                  <span className="label">Cidade:</span>
                  <span className="value">{modalAluno.endereco.cidade}</span>
                </div>
                <div className="info-item">
                  <span className="label">Bairro:</span>
                  <span className="value">{modalAluno.endereco.bairro || "Não informado"}</span>
                </div>
                <div className="info-item">
                  <span className="label">Rua:</span>
                  <span className="value">{modalAluno.endereco.rua || "Não informado"}</span>
                </div>
                <div className="info-item">
                  <span className="label">Povoado:</span>
                  <span className="value">{modalAluno.endereco.povoado || "Não informado"}</span>
                </div>
                <div className="info-item">
                  <span className="label">Número:</span>
                  <span className="value">{modalAluno.endereco.numero || "Não informado"}</span>
                </div>
                <div className="info-item">
                  <span className="label">CEP:</span>
                  <span className="value">{modalAluno.endereco.cep}</span>
                </div>
              </div>

              <Options>
                <button onClick={() => handleTransferirAluno(Number(modalAluno.id_aluno))}>
                  <BiTransferAlt />
                </button>
                <button onClick={() => { setModalStatusAluno(modalAluno); setNovoStatus(modalAluno.status_matricula); }}>
                  <GrUpdate />
                </button>
                <button onClick={() => handleExcluirAluno(Number(modalAluno.id_aluno))}>
                  <FaTrashAlt color="red" />
                </button>
              </Options>
            </Modal>
          )}

          {modalStatusAluno && (
            <Modal onClose={() => setModalStatusAluno(null)} title="Atualizar Status">
              <div>
                <label>Novo Status:</label>
                <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                  <option value="T">Trancado</option>
                  <option value="C">Cancelado</option>
                  <option value="F">Finalizado</option>
                  <option value="P">Pendente</option>
                </select>
              </div>
              <Options>
                <button onClick={handleAtualizarStatusMatricula}>Salvar</button>
              </Options>
            </Modal>
          )}
        </>
      )}
    </ListaContainer>
  );
}

export default AlunosList;
