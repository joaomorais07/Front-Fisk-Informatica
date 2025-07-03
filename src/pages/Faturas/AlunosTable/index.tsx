import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaUserPlus, FaUserTie } from "react-icons/fa";

import {
  Tabela,
  Status,
  PageButton,
  PaginationContainer,
  Options,
  SearchContainer,
  ModalContainer,
  ConfirmText,
  DataSection,
  SectionTitle,
  DataRow,
  DataValue,
  DataLabel,
  ButtonContainer,
  ErrorContainer,
} from "./styles";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { AlunoData } from "../../../utils/types";
import { api } from "../../../services/api";
import Modal from "../../../components/Modal/modal";
import InputField from "../../../components/Inputs/InputField";
import Button from "../../../components/Button";
import GeneralLoading from "../../../components/GeneralLoading";
import { FiInfo } from "react-icons/fi";

interface AlunosTableProps {
  busca: string;
  setBusca: (value: string) => void;
}

function AlunosTable({ busca, setBusca }: AlunosTableProps) {
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalAluno, setModalAluno] = useState<AlunoData | null>(null);
  const itensPorPagina = 10;

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setLoading(true);
        const response = await api.get("/alunos/sem-cliente");
        setAlunos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar alunos");
        setError("Erro ao carregar alunos");
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  const dadosFiltrados = alunos.filter((a) => a.nome_aluno.toLowerCase().includes(busca.toLowerCase()));

  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  const dadosPaginados = dadosFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  const gerarCliente = async (aluno: AlunoData) => {
    try {
      setLoading(true);
      await api.post("/clientes-asaas", { aluno_id: aluno.id_aluno });
      toast.success(`Cliente gerado para ${aluno.nome_aluno}`);
      setModalAluno(null);
      // Atualizar lista de alunos após gerar cliente
      const response = await api.get("/alunos/sem-cliente");
      setAlunos(response.data);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro: ${error.response.data.message}`);
      } else if (error.response && typeof error.response.data === "string") {
        toast.error(`Erro: ${error.response.data}`);
      } else {
        toast.error("Erro ao gerar assinatura. Verifique os dados e tente novamente.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tabela>
        <thead>
          <tr>
            <th colSpan={4}>
              <SearchContainer>
                <InputField label="Buscar aluno" value={busca} onChange={(e) => setBusca(e.target.value)} />
              </SearchContainer>
            </th>
          </tr>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>
                <GeneralLoading />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4}>
                <ErrorContainer>
                  <FiInfo size={24} />
                  <p>{error}</p>
                </ErrorContainer>
              </td>
            </tr>
          ) : (
            dadosPaginados.map((aluno) => (
              <tr key={aluno.id_aluno}>
                <td>{aluno.nome_aluno}</td>
                <td>{aluno.cpf_aluno}</td>
                <td>
                  <Status status="pendente">Sem Cliente Asaas</Status>
                </td>
                <td>
                  <Options>
                    <button onClick={() => setModalAluno(aluno)}>
                      <FaUserPlus /> Gerar Cliente
                    </button>
                  </Options>
                </td>
              </tr>
            ))
          )}
        </tbody>

        {!loading && totalPaginas > 1 && (
          <tfoot>
            <tr>
              <td colSpan={4}>
                <PaginationContainer>
                  <PageButton onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))} disabled={paginaAtual === 1}>
                    <MdOutlineKeyboardDoubleArrowLeft />
                  </PageButton>
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                    <PageButton key={pagina} onClick={() => setPaginaAtual(pagina)} active={pagina === paginaAtual}>
                      {pagina}
                    </PageButton>
                  ))}
                  <PageButton
                    onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
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

      {modalAluno && (
        <Modal title="Confirmar Geração de Cliente" onClose={() => setModalAluno(null)}>
          <ModalContainer>
            <ConfirmText>Deseja realmente gerar um cliente Asaas para o aluno abaixo?</ConfirmText>

            <DataSection>
              <SectionTitle>
                <FaUser style={{ marginRight: "8px" }} />
                Dados do Aluno
              </SectionTitle>

              <DataRow>
                <DataLabel>Nome:</DataLabel>
                <DataValue>{modalAluno.nome_aluno}</DataValue>
              </DataRow>

              <DataRow>
                <DataLabel>CPF:</DataLabel>
                <DataValue>{modalAluno.cpf_aluno || "Não informado"}</DataValue>
              </DataRow>

              <DataRow>
                <DataLabel>Telefone:</DataLabel>
                <DataValue>{modalAluno.telefone_aluno || "Não informado"}</DataValue>
              </DataRow>
            </DataSection>

            {modalAluno.tem_responsavel && (
              <DataSection>
                <SectionTitle>
                  <FaUserTie style={{ marginRight: "8px" }} />
                  Dados do Responsável
                </SectionTitle>

                <DataRow>
                  <DataLabel>Nome:</DataLabel>
                  <DataValue>{modalAluno.responsavel?.nome_responsavel || "Não informado"}</DataValue>
                </DataRow>

                <DataRow>
                  <DataLabel>CPF:</DataLabel>
                  <DataValue>{modalAluno.responsavel?.cpf_responsavel || "Não informado"}</DataValue>
                </DataRow>

                <DataRow>
                  <DataLabel>Telefone:</DataLabel>
                  <DataValue>{modalAluno.responsavel?.telefone_responsavel || "Não informado"}</DataValue>
                </DataRow>
              </DataSection>
            )}

            <ButtonContainer>
              <Button style={{ backgroundColor: "red" }} onClick={() => setModalAluno(null)}>
                Cancelar
              </Button>
              <Button onClick={() => gerarCliente(modalAluno)}>Confirmar</Button>
            </ButtonContainer>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
}

export default AlunosTable;
