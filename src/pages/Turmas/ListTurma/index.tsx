import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import {
  ListaContainer,
  Status,
  Tabela,
  PaginationContainer,
  PageButton,
  Options,
  DivStatus,
} from "./style";
import { TurmaData } from "../../../utils/types";
import InputField from "../../../components/Inputs/InputField";
import Modal from "../../../components/Modal/modal";
import SelectField from "../../../components/Selects";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { darkTheme } from "../../../themes";

// Mapeamento de status e transições válidas
const statusOptions = {
  A: "Aberta",
  P: "Em Progresso",
  C: "Concluída",
};

const statusTransitions: Record<keyof typeof statusOptions, (keyof typeof statusOptions)[]> = {
  A: ["P"],
  P: ["A", "C"],
  C: [],
};

function TurmasList() {
  const [turmas, setTurmas] = useState<TurmaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const [modalTurma, setModalTurma] = useState<TurmaData | null>(null);
  const [modalStatusTurma, setModalStatusTurma] = useState<TurmaData | null>(null);
  const [novoStatus, setNovoStatus] = useState("");

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    try {
      const response = await api.get("/turmas?status=A&status=P");
      setTurmas(response.data);
    } catch (error) {
      toast.error("Erro ao carregar turmas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTurma = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta turma?")) return;
    try {
      await api.delete(`/turmas/${id}`);
      toast.success("Turma excluída com sucesso!");
      setTurmas((prev) => prev.filter((t) => t.id_turma !== id));
      setModalTurma(null);
    } catch (error) {
      toast.error("Erro ao excluir turma.");
    }
  };

  const handleStatusUpdate = async () => {
    if (!modalStatusTurma || !novoStatus) return;
    try {
      await api.put(`/turmas/atualizarStatus/${modalStatusTurma.id_turma}`, { status: novoStatus });
      toast.success("Status atualizado com sucesso!");
      setModalStatusTurma(null);
      setNovoStatus("");
      fetchTurmas();
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

  const getStatusLabel = (status: string) => statusOptions[status as keyof typeof statusOptions] || "Desconhecido";

  const turmasFiltradas = turmas.filter((turma) =>
    turma.nome_turma.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(turmasFiltradas.length / itensPorPagina);
  const turmasPaginadas = turmasFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  if (loading) return <p>Carregando...</p>;
  if (turmas.length === 0) return <p>Nenhuma turma cadastrada.</p>;

  return (
    <ListaContainer>
      <Tabela>
        <thead>
          <tr>
            <th colSpan={6} style={{ background: "white" }}>
              <InputField label="Buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
            </th>
          </tr>
          <tr>
            <th>Nome</th>
            <th>Data Início</th>
            <th>Dia</th>
            <th>Alunos</th>
            <th>Status</th>
            <th>Ver mais</th>
          </tr>
        </thead>
        <tbody>
          {turmasPaginadas.map((turma) => (
            <tr key={turma.id_turma}>
              <td data-label="Nome">{turma.nome_turma}</td>
              <td data-label="Data Início">{turma.data_inicio}</td>
              <td data-label="Dia">{turma.dia_semana}</td>
              <td data-label="Alunos">{turma.total_alunos}</td>
              <td data-label="Status">
                <Status status={turma.status}>{getStatusLabel(turma.status)}</Status>
              </td>
              <td className="tdOptions" data-label="Ver mais">
                <button onClick={() => setModalTurma(turma)}>👁️</button>
              </td>
            </tr>
          ))}
        </tbody>

        {totalPaginas > 1 && (
          <tfoot>
            <tr>
              <td colSpan={6}>
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

      {/* Modal Detalhes */}
      {modalTurma && (
        <Modal title="Detalhes da Turma" onClose={() => setModalTurma(null)}>
          <div className="section">
            <div className="info-item"><span className="label">Nome:</span> <span className="value">{modalTurma.nome_turma}</span></div>
            <div className="info-item"><span className="label">Curso:</span> <span className="value">{modalTurma.curso}</span></div>
            <div className="info-item"><span className="label">Data Início:</span> <span className="value">{modalTurma.data_inicio}</span></div>
            <div className="info-item"><span className="label">Dia da Semana:</span> <span className="value">{modalTurma.dia_semana}</span></div>
            <div className="info-item"><span className="label">Turno:</span> <span className="value">{modalTurma.turno}</span></div>
            <div className="info-item"><span className="label">Total de Alunos:</span> <span className="value">{modalTurma.total_alunos}</span></div>
            <div className="info-item"><span className="label">Horário:</span> <span className="value">{modalTurma.horario || "Não definido"}</span></div>
            <div className="info-item"><span className="label">Status:</span> <span className="value">{getStatusLabel(modalTurma.status)}</span></div>
            <div className="info-item"><span className="label">Observação:</span> <span className="value">{modalTurma.observacoes || "Nenhuma observação"}</span></div>
          </div>

          <Options>
            <button onClick={() => {
              setNovoStatus("");
              setModalStatusTurma(modalTurma);
              setModalTurma(null);
            }}>
              <GrUpdate />
            </button>
            <button onClick={() => handleDeleteTurma(modalTurma.id_turma || "")}>
              <FaTrashAlt color="red" />
            </button>
          </Options>
        </Modal>
      )}

      {/* Modal Atualizar Status */}
      {modalStatusTurma && (
        <Modal title="Atualizar Status da Turma" onClose={() => setModalStatusTurma(null)}>
          <DivStatus>
            <label>Novo Status:</label>
            <SelectField
              value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value)}
            >
              <option value="" disabled>Selecione</option>
              {statusTransitions[modalStatusTurma.status as keyof typeof statusOptions].map((s) => (
                <option key={s} value={s}>{statusOptions[s]}</option>
              ))}
            </SelectField>
          </DivStatus>
          <Options>
            <button
              onClick={handleStatusUpdate}
              disabled={!novoStatus}
              style={{ backgroundColor: darkTheme.colors.secundary }}
            >
              Salvar
            </button>
          </Options>
        </Modal>
      )}
    </ListaContainer>
  );
}

export default TurmasList;
