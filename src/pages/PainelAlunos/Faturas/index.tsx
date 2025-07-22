import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/Auth";
import Header from "../../../components/Header";
import { FaCopy, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  Container,
  Card,
  Title,
  GroupContainer,
  GroupTitle,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ValueCell,
  DueDateCell,
  StatusPill,
  Button,
  ShowAllButton,
  CopyButton,
  PaymentModalContent,
  SectionTitle,
  QRCodeWrapper,
  PaymentMethodSection,
  PaymentDetails,
  DetailItem,
  PaymentOptions,
  PaymentButton,
  PixCodeContainer,
  PaymentInstruction,
  PixCodePreview,
} from "./styles";
import Modal from "../../../components/Modal/modal";

interface IParcela {
  id: string;
  valor: number;
  vencimento: string;
  status: "PENDING" | "RECEIVED" | "OVERDUE";
  parcela_numero: number;
  total_parcelas: number;
  url_fatura: string;
  url_boleto_pdf: string;
  pix_copia_cola?: string;
  pix_qr_base64?: string;
  asaas_payment_id?: string;
}

interface IAssinatura {
  id: string;
  nome_plano: string;
  data_inicio: string;
  parcelas: IParcela[];
}

const FaturaAlunoPage: React.FC = () => {
  const { user } = useAuth();
  const [assinaturas, setAssinaturas] = useState<IAssinatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [selectedParcela, setSelectedParcela] = useState<IParcela | null>(null);
  const [loadingPix, setLoadingPix] = useState(false);

  useEffect(() => {
    const fetchFaturas = async () => {
      try {
        const response = await api.get(`/alunos/buscar-fatura/${user?.dados.id}`);
        console.log(response.data.assinaturas)
        setAssinaturas(response.data.assinaturas || []);

        // Initialize all groups as collapsed (showing only first 2 parcels)
        const initialExpandedState: Record<string, boolean> = {};
        response.data.assinaturas?.forEach((assinatura: IAssinatura) => {
          initialExpandedState[assinatura.id] = false;
        });
        setExpandedGroups(initialExpandedState);
      } catch (err) {
        setError("Erro ao carregar as faturas");
      } finally {
        setLoading(false);
      }
    };
    fetchFaturas();
  }, [user]);

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-BR");
  };

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getStatusTraduzido = (status: string) => {
    switch (status) {
      case "PENDING":
        return "PENDENTE";
      case "RECEIVED":
        return "PAGO";
      case "OVERDUE":
        return "ATRASADO";
      default:
        return status;
    }
  };

  const getFirstTwoUnpaidParcels = (parcelas: IParcela[]) => {
    // Filtra apenas parcelas não pagas (PENDING ou OVERDUE)
    const unpaidParcels = parcelas.filter((p) => p.status === "PENDING" || p.status === "OVERDUE");

    return unpaidParcels.sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime()).slice(0, 2);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleOpenPayment = async (parcela: IParcela) => {
    if (parcela.pix_qr_base64 && parcela.pix_copia_cola) {
      setSelectedParcela(parcela);
      return;
    }

    try {
      setLoadingPix(true);
      const response = await api.get(`/clientes-asaas/${parcela.id}/buscar_pix_parcelas`);

      setAssinaturas((prev) =>
        prev.map((assinatura) => ({
          ...assinatura,
          parcelas: assinatura.parcelas.map((p) => (p.id === parcela.id ? { ...p, ...response.data } : p)),
        }))
      );

      setSelectedParcela({
        ...parcela,
        ...response.data,
      });
    } catch (err) {
      toast.error("Erro ao buscar dados do PIX");
    } finally {
      setLoadingPix(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Código PIX copiado!");
  };

  return (
    <>
      <Header />
      <Container>
        <Card>
          <Title>Minhas Faturas</Title>

          {loading && <p>Carregando faturas...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && !assinaturas.length && <p>Não há faturas cadastradas.</p>}

          {assinaturas.map((assinatura) => {
            const parcelasOrdenadas = [...assinatura.parcelas].sort(
              (a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime()
            );

            const parcelasParaExibir = expandedGroups[assinatura.id]
              ? parcelasOrdenadas // Mostra TODAS quando expandido
              : getFirstTwoUnpaidParcels(assinatura.parcelas); // Mostra apenas 2 não pagas quando recolhido

            return (
              <GroupContainer key={assinatura.id}>
                <GroupTitle>{assinatura.nome_plano}</GroupTitle>

                <Table>
                  <TableHeader>
                    <TableCell>Parcela</TableCell>
                    <TableCell>Vencimento</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableHeader>
                  {parcelasParaExibir.map((parcela) => (
                    <TableRow key={parcela.id}>
                      <TableCell data-label="Parcela">
                        {parcela.parcela_numero}/{parcela.total_parcelas}
                      </TableCell>
                      <DueDateCell status={parcela.status}>{formatarData(parcela.vencimento)}</DueDateCell>
                      <ValueCell>{formatarMoeda(parcela.valor)}</ValueCell>
                      <TableCell>
                        <StatusPill status={parcela.status}>{getStatusTraduzido(parcela.status)}</StatusPill>
                      </TableCell>
                      <TableCell>
                        {parcela.status !== "RECEIVED" && (
                          <Button onClick={() => handleOpenPayment(parcela)} disabled={loadingPix}>
                            {loadingPix ? "Carregando..." : "Pagar"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>

                {assinatura.parcelas.length > 2 && (
                  <ShowAllButton onClick={() => toggleGroup(assinatura.id)}>
                    {expandedGroups[assinatura.id] ? (
                      <>
                        <FaChevronUp /> Ver menos
                      </>
                    ) : (
                      <>
                        <FaChevronDown /> Ver todas as parcelas ({assinatura.parcelas.length})
                      </>
                    )}
                  </ShowAllButton>
                )}
              </GroupContainer>
            );
          })}
        </Card>
      </Container>

      {/* Payment Modal */}
      {selectedParcela && (
        <Modal title={`Pagamento - Parcela ${selectedParcela.parcela_numero}`} onClose={() => setSelectedParcela(null)}>
          <PaymentModalContent>
            {selectedParcela.pix_qr_base64 && (
              <PaymentMethodSection>
                <SectionTitle>Pagamento via PIX</SectionTitle>
                <QRCodeWrapper>
                  <img src={`data:image/png;base64,${selectedParcela.pix_qr_base64}`} alt="QR Code PIX" />
                </QRCodeWrapper>

                <PixCodeContainer>
                  <PixCodePreview>{selectedParcela.pix_copia_cola?.substring(0, 30)}...</PixCodePreview>
                  <CopyButton onClick={() => copyToClipboard(selectedParcela.pix_copia_cola || "")}>
                    <FaCopy /> Copiar código
                  </CopyButton>
                </PixCodeContainer>

                <PaymentInstruction>Escaneie o QR code ou copie o código PIX para pagamento</PaymentInstruction>
              </PaymentMethodSection>
            )}

            <PaymentOptions>
              {selectedParcela.url_boleto_pdf && (
                <PaymentButton onClick={() => window.open(selectedParcela.url_boleto_pdf, "_blank")}>
                  <FaExternalLinkAlt /> Baixar Boleto Bancário
                </PaymentButton>
              )}
              {selectedParcela.url_fatura && (
                <PaymentButton onClick={() => window.open(selectedParcela.url_fatura, "_blank")}>
                  <FaExternalLinkAlt /> Pagamento Online
                </PaymentButton>
              )}
            </PaymentOptions>

            <PaymentDetails>
              <DetailItem>
                <strong>Valor:</strong> {formatarMoeda(selectedParcela.valor)}
              </DetailItem>
              <DetailItem>
                <strong>Vencimento:</strong> {formatarData(selectedParcela.vencimento)}
              </DetailItem>
            </PaymentDetails>
          </PaymentModalContent>
        </Modal>
      )}
    </>
  );
};

export default FaturaAlunoPage;
