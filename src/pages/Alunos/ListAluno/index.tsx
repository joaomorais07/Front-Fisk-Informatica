import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { DivStatus, ListaContainer, Options, PageButton, PaginationContainer, Status, Tabela } from "./style";
import { AlunoData, TurmaData } from "../../../utils/types";
import InputField from "../../../components/Inputs/InputField";
import Modal from "../../../components/Modal/modal";
import { FaTrashAlt } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import SelectField from "../../../components/Selects";
import { darkTheme } from "../../../themes";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

// Tipos e constantes auxiliares
type StatusKey = keyof typeof statusOptions;

const statusOptions = {
  A: "Ativo",
  T: "Trancado",
  C: "Cancelado",
  F: "Finalizado",
  P: "Pendente",
  N: "Não Matriculado",
};

const statusTransitions: Record<StatusKey, StatusKey[]> = {
  A: ["T", "C", "F", "P"],
  T: ["A", "C"],
  P: ["A", "C"],
  C: [],
  F: [],
  N: [],
};

function formatCPF(cpf: string | null): string {
  if (!cpf) return "Não informado";
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return cpf;
  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function AlunosList() {
  // Estados
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [turmasDisponiveis, setTurmasDisponiveis] = useState<TurmaData[]>([]);
  const [busca, setBusca] = useState("");
  const ITENS_POR_PAGINA = 10; // ou 5, 20 etc.
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalState, setModalState] = useState<{
    aluno: AlunoData | null;
    status: AlunoData | null;
    transfer: AlunoData | null;
  }>({
    aluno: null,
    status: null,
    transfer: null,
  });
  const [formData, setFormData] = useState({
    novoStatus: "",
    turmaTransferencia: "",
  });

  // Efeitos
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [alunosResponse, turmasResponse] = await Promise.all([
          api.get<AlunoData[]>("/alunos/listarAlunos"),
          api.get<TurmaData[]>("/turmas?status=A&status=P"),
        ]);
        setAlunos(alunosResponse.data);
        setTurmasDisponiveis(turmasResponse.data);
      } catch (error) {
        toast.error("Erro ao carregar dados iniciais");
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const alunosFiltrados = alunos.filter((aluno) => {
    const textoBusca = busca.toLowerCase();
    return aluno.nome_aluno.toLowerCase().includes(textoBusca) || formatCPF(aluno.cpf_aluno).includes(textoBusca);
  });

  const totalPaginas = Math.ceil(alunosFiltrados.length / ITENS_POR_PAGINA);
  const alunosPaginados = alunosFiltrados.slice((paginaAtual - 1) * ITENS_POR_PAGINA, paginaAtual * ITENS_POR_PAGINA);

  // Handlers
  const handleTransferStudent = async () => {
    const { transfer: aluno } = modalState;
    const { turmaTransferencia } = formData;

    if (!aluno || !turmaTransferencia) {
      toast.warn("Selecione uma turma válida");
      return;
    }

    try {
      await api.put(`/alunos/transferir/${aluno.id_aluno}`, {
        turma_id: Number(turmaTransferencia),
      });
      toast.success("Aluno transferido com sucesso!");
      closeModals();
      fetchAlunos();
    } catch (error: any) {
      handleApiError(error, "Erro ao transferir aluno");
    }
  };

  const handleUpdateStatus = async () => {
    const { status: aluno } = modalState;
    const { novoStatus } = formData;

    if (!aluno || !novoStatus) {
      toast.warn("Selecione um status válido");
      return;
    }

    try {
      await api.put(`/alunos/atualizarMatricula/${aluno.id_aluno}`, {
        status_matricula: novoStatus,
      });
      toast.success("Status atualizado com sucesso!");
      closeModals();
      fetchAlunos();
    } catch (error: any) {
      handleApiError(error, "Erro ao atualizar status");
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) return;

    try {
      await api.delete(`/alunos/${id}`);
      toast.success("Aluno excluído com sucesso!");
      setAlunos((prev) => prev.filter((a) => Number(a.id_aluno) !== id));
    } catch (error: any) {
      handleApiError(error, "Erro ao excluir aluno");
    }
  };

  function getStatusEmoji(status: string) {
    switch (status) {
      case "A":
        return "🔵"; // Aberta
      case "P":
        return "🟡"; // Progresso
      case "C":
        return "🟢"; // Concluída
      default:
        return "⚪";
    }
  }

  // Funções auxiliares
  const fetchAlunos = async () => {
    try {
      const response = await api.get<AlunoData[]>("/alunos/listarAlunos");
      setAlunos(response.data);
    } catch (error: any) {
      handleApiError(error, "Erro ao carregar alunos");
    }
  };

  const handleApiError = (error: any, defaultMessage: string) => {
    const message = error?.response?.data?.message || error?.response?.data?.detail || defaultMessage;
    toast.error(message);
    console.error("Erro:", error);
  };

  const closeModals = () => {
    setModalState({
      aluno: null,
      status: null,
      transfer: null,
    });
    setFormData({
      novoStatus: "",
      turmaTransferencia: "",
    });
  };

  const getAvailableStatuses = (currentStatus: StatusKey): StatusKey[] => {
    return statusTransitions[currentStatus] || [];
  };

  // Renderização
  if (loading) return <p>Carregando...</p>;
  if (alunos.length === 0) return <p>Nenhum aluno cadastrado.</p>;

  return (
    <ListaContainer>
      <Tabela>
        <thead>
          <tr>
            <th colSpan={5} style={{ background: "white" }}>
              <InputField label="Buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
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
          {alunosPaginados.map((aluno) => (
            <tr key={aluno.id_aluno}>
              <td data-label="Nome">{aluno.nome_aluno}</td>
              <td data-label="Data Nascimento">{aluno.data_nascimento}</td>
              <td data-label="CPF">{formatCPF(aluno.cpf_aluno)}</td>
              <td data-label="Status Matrícula">
                <Status status={aluno.status_matricula}>
                  {statusOptions[aluno.status_matricula as keyof typeof statusOptions]}
                </Status>
              </td>
              <td className="tdOptions" data-label="Ver mais">
                <button onClick={() => setModalState((prev) => ({ ...prev, aluno }))}>👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
        {totalPaginas > 1 && (
          <tfoot>
            <tr>
              <td colSpan={5}>
                <PaginationContainer>
                  <PageButton onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))} disabled={paginaAtual === 1}>
                    <MdOutlineKeyboardDoubleArrowLeft />
                  </PageButton>

                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                    <PageButton key={pagina} onClick={() => setPaginaAtual(pagina)} active={pagina === paginaAtual}>
                      {pagina}
                    </PageButton>
                  ))}

                  <PageButton
                    onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
                    disabled={paginaAtual === totalPaginas}
                  >
                    <MdOutlineKeyboardDoubleArrowRight />
                  </PageButton>
                </PaginationContainer>
              </td>
            </tr>
          </tfoot>
        )}
      </Tabela>

      {/* Modal de Detalhes */}
      {modalState.aluno && (
        <Modal onClose={closeModals} title="Detalhes do Aluno">
          <StudentDetails aluno={modalState.aluno} />
          <Options>
            <button onClick={() => setModalState((prev) => ({ ...prev, transfer: prev.aluno }))}>
              <BiTransferAlt />
            </button>
            <button onClick={() => setModalState((prev) => ({ ...prev, status: prev.aluno }))}>
              <GrUpdate />
            </button>
            <button onClick={() => handleDeleteStudent(Number(modalState.aluno?.id_aluno))}>
              <FaTrashAlt color="red" />
            </button>
          </Options>
        </Modal>
      )}

      {/* Modal de Status */}
      {modalState.status && (
        <Modal onClose={closeModals} title="Atualizar Status">
          <DivStatus>
            <label>Novo Status:</label>
            <SelectField
              value={formData.novoStatus}
              onChange={(e) => setFormData((prev) => ({ ...prev, novoStatus: e.target.value }))}
            >
              <option value="" disabled>
                Selecione
              </option>
              {getAvailableStatuses(modalState.status.status_matricula as StatusKey).map((status) => (
                <option key={status} value={status}>
                  {statusOptions[status]}
                </option>
              ))}
            </SelectField>
          </DivStatus>
          <Options>
            <button style={{ backgroundColor: darkTheme.colors.secundary }} onClick={handleUpdateStatus}>
              Salvar
            </button>
          </Options>
        </Modal>
      )}

      {/* Modal de Transferência */}
      {modalState.transfer && (
        <Modal onClose={closeModals} title="Transferir Aluno">
          <DivStatus>
            <label>Nova Turma:</label>
            <SelectField
              value={formData.turmaTransferencia}
              onChange={(e) => setFormData((prev) => ({ ...prev, turmaTransferencia: e.target.value }))}
            >
              <option value="" disabled>
                Selecione a turma
              </option>
              {turmasDisponiveis
                .filter((turma: any) => turma.id_turma !== modalState.aluno?.id_turma) // 🔍 ignora a turma atual
                .map((turma: any) => {
                  const emoji = getStatusEmoji(turma.status);
                  return (
                    <option key={turma.id_turma} value={turma.id_turma}>
                      {`${emoji} ${turma.nome_turma} - ${turma.horario} - ${turma.total_alunos}`}
                    </option>
                  );
                })}
            </SelectField>
          </DivStatus>
          <Options>
            <button style={{ backgroundColor: darkTheme.colors.secundary }} onClick={handleTransferStudent}>
              Transferir
            </button>
          </Options>
        </Modal>
      )}
    </ListaContainer>
  );
}

// Componente auxiliar para detalhes do aluno
const StudentDetails = ({ aluno }: { aluno: AlunoData }) => (
  <>
    <div className="section">
      <h3>Dados do Aluno</h3>
      <DetailItem label="Nome" value={aluno.nome_aluno} />
      <DetailItem label="CPF" value={formatCPF(aluno.cpf_aluno)} />
      <DetailItem label="Telefone" value={aluno.telefone_aluno || "Não informado"} />
      <DetailItem label="Sexo" value={aluno.sexo} />
      <DetailItem label="Data de Nascimento" value={aluno.data_nascimento} />
      <DetailItem label="Status da Matrícula" value={statusOptions[aluno.status_matricula as StatusKey]} />
    </div>

    <div className="section">
      <h3>Responsável</h3>
      {aluno.tem_responsavel ? (
        <>
          <DetailItem label="Nome" value={aluno.responsavel?.nome_responsavel || "Não informado"} />
          <DetailItem label="CPF" value={formatCPF(aluno.responsavel?.cpf_responsavel)} />
          <DetailItem label="Telefone" value={aluno.responsavel?.telefone_responsavel || "Não informado"} />
        </>
      ) : (
        <p>Sem responsável</p>
      )}
    </div>

    <div className="section">
      <h3>Endereço</h3>
      {Object.entries(aluno.endereco)
        .filter(([key]) => key !== "id_endereco")
        .map(([key, value]) => (
          <DetailItem key={key} label={key[0].toUpperCase() + key.slice(1)} value={value || "Não informado"} />
        ))}
    </div>
  </>
);

// Componente auxiliar para itens de detalhe
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="info-item">
    <span className="label">{label}:</span>
    <span className="value">{value}</span>
  </div>
);

export default AlunosList;
