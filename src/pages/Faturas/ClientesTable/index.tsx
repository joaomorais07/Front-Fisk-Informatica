import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaFileInvoiceDollar, FaCopy } from "react-icons/fa";
import {
  Tabela,
  Status,
  PageButton,
  PaginationContainer,
  Options,
  SearchContainer,
  ClienteRow,
  ActionButton,
  FilterContainer,
  FilterOption,
  ParcelasModalContent,
  PagamentoModalContent,
  ErrorContainer,
} from "./styles";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IAssinatura, IClienteData, IParcela } from "../../../utils/types";
import { api } from "../../../services/api";
import InputField from "../../../components/Inputs/InputField";
import Modal from "../../../components/Modal/modal";
import Button from "../../../components/Button";
import GeneralLoading from "../../../components/GeneralLoading";
import { FiInfo } from "react-icons/fi";

interface ClientesTableProps {
  busca: string;
  setBusca: (value: string) => void;
}

function ClientesTable({ busca, setBusca }: ClientesTableProps) {
  const [clientes, setClientes] = useState<IClienteData[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [selectedParcela, setSelectedParcela] = useState<IParcela | null>(null);
  const [filter, setFilter] = useState<"all" | "with" | "without">("all");
  const [clienteParaAssinatura, setClienteParaAssinatura] = useState<IClienteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAssinatura, setSelectedAssinatura] = useState<IAssinatura | null>(null);
  const [error, setError] = useState("");
  const [novaAssinatura, setNovaAssinatura] = useState({
    valor_por_parcela: "",
    quantidade_de_parcela: "",
    descricao: "",
    vencimento: "",
  });

  useEffect(() => {
    if (clienteParaAssinatura) {
      const primeiroNome = clienteParaAssinatura.nome.split(" ")[0];
      setNovaAssinatura({
        valor_por_parcela: "",
        quantidade_de_parcela: "",
        descricao: `Curso de informática (${primeiroNome})`,
        vencimento: "",
      });
    }
  }, [clienteParaAssinatura]);

  const itensPorPagina = 10;

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/clientes-asaas/alunos");
        setClientes(
          response.data.map((cliente: IClienteData) => ({
            ...cliente,
            assinaturas:
              cliente.assinaturas?.map((assinatura: IAssinatura) => ({
                ...assinatura,
                parcelas:
                  assinatura.parcelas?.map((parcela: IParcela) => ({
                    ...parcela,
                    pix_qr_base64: parcela.pix_qr_base64 || undefined,
                    pix_copia_cola: parcela.pix_copia_cola || undefined,
                  })) || [],
              })) || [],
          }))
        );
      } catch (error) {
        toast.error("Erro ao carregar clientes");
        setError("Erro ao carregar clientes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  const buscarDadosPix = async (idParcela: Number) => {
    try {
      setLoading(true);
      const response = await api.get(`/clientes-asaas/${idParcela}/buscar_pix_parcelas`);
      return {
        pix_qr_base64: response.data.pix_qr_base64,
        pix_copia_cola: response.data.pix_copia_cola,
      };
    } catch (error) {
      toast.error("Erro ao buscar dados do PIX");
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const atualizarAssinaturaComPix = (assinatura: IAssinatura, parcelaId: number, pixData: any) => {
    return {
      ...assinatura,
      parcelas: assinatura.parcelas.map((p) => (p.id === parcelaId ? { ...p, ...pixData } : p)),
    };
  };

  const isFormularioValido = () => {
    return (
      novaAssinatura.valor_por_parcela.trim() !== "" &&
      !isNaN(parseFloat(novaAssinatura.valor_por_parcela)) &&
      novaAssinatura.quantidade_de_parcela.trim() !== "" &&
      !isNaN(parseInt(novaAssinatura.quantidade_de_parcela)) &&
      novaAssinatura.descricao.trim() !== "" &&
      novaAssinatura.vencimento.trim() !== ""
    );
  };

  const gerarNovaAssinatura = async () => {
    if (!clienteParaAssinatura) return;
    const { valor_por_parcela, quantidade_de_parcela, descricao, vencimento } = novaAssinatura;

    try {
      setLoading(true);
      const response = await api.post(`/clientes-asaas/${clienteParaAssinatura.id_cliente}/criar_assinatura`, {
        aluno_id: clienteParaAssinatura.id_aluno,
        valor_por_parcela,
        quantidade_de_parcela,
        descricao,
        vencimento,
      });

      if (response.status === 201) {
        toast.success(`Assinatura gerada para ${clienteParaAssinatura.nome}`);
        setClienteParaAssinatura(null);

        const updatedResponse = await api.get("/clientes-asaas/alunos");
        setClientes(updatedResponse.data);
      } else {
        toast.error("Falha ao gerar a assinatura. Tente novamente.");
      }
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

  const getStatusParcela = (status: string) => {
    switch (status) {
      case "OVERDUE":
        return "Vencida";
      case "RECEIVED":
        return "Paga";
      case "PENDING":
        return "Pendente";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OVERDUE":
        return "error";
      case "RECEIVED":
        return "success";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusCliente = (parcelas: IParcela[]) => {
    if (!parcelas || parcelas.length === 0) {
      return "Sem plano";
    }
    return parcelas.some((p) => p.status === "OVERDUE") ? "Atrasado" : "Em dia";
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const hasAssinatura = cliente.assinaturas?.some((a) => a.parcelas?.length > 0);
    if (filter === "with") return hasAssinatura;
    if (filter === "without") return !hasAssinatura;
    return true;
  });

  const clientesBuscaFiltrados = clientesFiltrados.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()));

  const totalPaginas = Math.ceil(clientesBuscaFiltrados.length / itensPorPagina);
  const dadosPaginados = clientesBuscaFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  return (
    <>
      <Tabela>
        <thead>
          <tr>
            <th colSpan={6} style={{ background: "white" }}>
              <SearchContainer>
                <InputField label="Buscar cliente" value={busca} onChange={(e) => setBusca(e.target.value)} />

                <FilterContainer>
                  <FilterOption active={filter === "all"} onClick={() => setFilter("all")}>
                    Todos os Clientes
                  </FilterOption>
                  <FilterOption active={filter === "with"} onClick={() => setFilter("with")}>
                    Com Assinatura
                  </FilterOption>
                  <FilterOption active={filter === "without"} onClick={() => setFilter("without")}>
                    Sem Assinatura
                  </FilterOption>
                </FilterContainer>
              </SearchContainer>
            </th>
          </tr>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Parcelas</th>
            <th>Vencidas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>
                <GeneralLoading />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={6}>
                <ErrorContainer>
                  <FiInfo size={24} />
                  <p>{error}</p>
                </ErrorContainer>
              </td>
            </tr>
          ) : (
            dadosPaginados.map((cliente) => {
              // Se não tiver assinaturas, mostra uma linha básica
              if (!cliente.assinaturas || cliente.assinaturas.length === 0) {
                return (
                  <ClienteRow key={`${cliente.id_aluno}-no-sub`}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                      <Status status="default">Sem plano</Status>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <Options>
                        <ActionButton onClick={() => setClienteParaAssinatura(cliente)}>
                          <FaFileInvoiceDollar /> Criar Carnê
                        </ActionButton>
                      </Options>
                    </td>
                  </ClienteRow>
                );
              }

              // Para cada assinatura do cliente, cria uma linha separada
              return cliente.assinaturas.map((assinatura) => {
                const parcelas = assinatura.parcelas || [];
                const pendentes = parcelas.filter((p) => p.status === "PENDING").length;
                const vencidas = parcelas.filter((p) => p.status === "OVERDUE").length;
                const parcelasTotais = parcelas.length;
                const statusCliente = getStatusCliente(parcelas);

                return (
                  <ClienteRow key={`${cliente.id_aluno}-${assinatura.id}`}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                      <Status status={statusCliente === "Atrasado" ? "error" : "success"}>{statusCliente}</Status>
                    </td>
                    <td>
                      {pendentes}/{parcelasTotais}
                    </td>
                    <td>{vencidas}</td>
                    <td>
                      <Options>
                        <ActionButton onClick={() => setSelectedAssinatura(assinatura)}>Ver Parcelas</ActionButton>
                        <ActionButton onClick={() => setClienteParaAssinatura(cliente)}>
                          <FaFileInvoiceDollar />
                        </ActionButton>
                      </Options>
                    </td>
                  </ClienteRow>
                );
              });
            })
          )}
        </tbody>

        {totalPaginas > 1 && (
          <tfoot>
            <tr>
              <td colSpan={6}>
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
      {clienteParaAssinatura && (
        <Modal title="Nova Assinatura" onClose={() => setClienteParaAssinatura(null)}>
          <PagamentoModalContent>
            <h1>
              <strong>Nome: </strong>
              {clienteParaAssinatura.nome}
            </h1>

            <div className="form-group">
              <label>Valor por Parcela</label>
              <input
                type="number"
                value={novaAssinatura.valor_por_parcela}
                onChange={(e) => setNovaAssinatura({ ...novaAssinatura, valor_por_parcela: e.target.value })}
                placeholder="75.00"
              />
            </div>

            <div className="form-group">
              <label>Quantidade de Parcelas</label>
              <input
                type="number"
                value={novaAssinatura.quantidade_de_parcela}
                onChange={(e) => setNovaAssinatura({ ...novaAssinatura, quantidade_de_parcela: e.target.value })}
                placeholder="12"
              />
            </div>

            <div className="form-group">
              <label>Vencimento (AAAA-MM-DD)</label>
              <input
                type="date"
                value={novaAssinatura.vencimento}
                onChange={(e) => setNovaAssinatura({ ...novaAssinatura, vencimento: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                value={novaAssinatura.descricao}
                onChange={(e) => setNovaAssinatura({ ...novaAssinatura, descricao: e.target.value })}
                placeholder="Descrição"
              />
            </div>

            <Button
              onClick={gerarNovaAssinatura}
              disabled={!isFormularioValido()}
              style={{ cursor: isFormularioValido() ? "pointer" : "not-allowed" }}
            >
              Criar Carnê
            </Button>
          </PagamentoModalContent>
        </Modal>
      )}

      {selectedAssinatura && (
        <Modal title={"Parcelas"} onClose={() => setSelectedAssinatura(null)}>
          <ParcelasModalContent>
            <div className="assinatura-info">
              <h4>{selectedAssinatura.nome_plano}</h4>
            </div>
            <div className="parcelas-grid">
              {selectedAssinatura.parcelas
                .sort((a: IParcela, b: IParcela) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime())
                .map((parcela: IParcela) => {
                  const [year, month, day] = parcela.vencimento.split("-"); // Fixed: using parcela.vencimento instead of hardcoded date

                  return (
                    <div key={parcela.id} className="parcela-card">
                      <div className="parcela-header">
                        <span>Vencimento: {`${day}/${month}/${year}`}</span>
                        <Status status={getStatusColor(parcela.status)}>{getStatusParcela(parcela.status)}</Status>
                      </div>

                      <div className="parcela-body">
                        <p>Valor: R$ {parcela.valor?.toFixed(2).replace(".", ",")}</p>

                        {parcela.status !== "RECEIVED" && (
                          <div className="parcela-actions">
                            <Button
                              onClick={async () => {
                                try {
                                  // Verifica se precisa buscar dados do PIX
                                  if (!parcela.pix_qr_base64 || !parcela.pix_copia_cola) {
                                    const dadosPix = await buscarDadosPix(parcela.id);

                                    if (!dadosPix) {
                                      toast.warning("Não foi possível obter os dados do PIX");
                                      return;
                                    }

                                    // Atualiza a assinatura no estado global
                                    setClientes((prevClientes) =>
                                      prevClientes.map((c) => ({
                                        ...c,
                                        assinaturas:
                                          c.assinaturas?.map((a) =>
                                            a.id === selectedAssinatura?.id
                                              ? atualizarAssinaturaComPix(a, parcela.id, dadosPix)
                                              : a
                                          ) || [],
                                      }))
                                    );

                                    // Atualiza a assinatura selecionada
                                    if (selectedAssinatura) {
                                      setSelectedAssinatura(atualizarAssinaturaComPix(selectedAssinatura, parcela.id, dadosPix));
                                    }

                                    // Atualiza a parcela selecionada
                                    setSelectedParcela({
                                      ...parcela,
                                      ...dadosPix,
                                    });
                                  } else {
                                    setSelectedParcela(parcela);
                                  }
                                } catch (error) {
                                  toast.error("Erro ao processar pagamento");
                                  console.error(error);
                                }
                              }}
                            >
                              Formas de Pagamento
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </ParcelasModalContent>
        </Modal>
      )}

      {/* Modal com formas de pagamento */}
      {selectedParcela && (
        <Modal title="Formas de Pagamento" onClose={() => setSelectedParcela(null)}>
          <PagamentoModalContent>
            {selectedParcela.pix_qr_base64 && (
              <div className="payment-section pix-section">
                <h3>Pagamento via PIX</h3>
                <div className="qr-code-container">
                  <img src={`data:image/png;base64,${selectedParcela.pix_qr_base64}`} alt="QR Code Pix" className="qr-code" />
                </div>

                <div className="pix-code-container">
                  <div className="pix-code-wrapper">
                    <span className="pix-code">{selectedParcela.pix_copia_cola?.substring(0, 30)}...</span>
                    <button
                      className="copy-button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedParcela.pix_copia_cola || "");
                        const button = document.querySelector(".copy-button");
                        if (button) {
                          button.classList.add("copied");
                          setTimeout(() => button.classList.remove("copied"), 2000);
                        }
                      }}
                    >
                      <FaCopy />
                      <span className="tooltip">Copiar</span>
                    </button>
                  </div>
                </div>

                <p className="payment-instruction">Escaneie o QR code ou use o código PIX acima</p>
              </div>
            )}

            {selectedParcela.url_boleto_pdf && (
              <div className="payment-section">
                <Button onClick={() => window.open(selectedParcela.url_boleto_pdf!, "_blank")}>Baixar Boleto</Button>
              </div>
            )}
            {selectedParcela.url_fatura && (
              <div className="payment-section">
                <Button onClick={() => window.open(selectedParcela.url_fatura!, "_blank")}>Fatura Online</Button>
              </div>
            )}
          </PagamentoModalContent>
        </Modal>
      )}
    </>
  );
}
export default ClientesTable;
