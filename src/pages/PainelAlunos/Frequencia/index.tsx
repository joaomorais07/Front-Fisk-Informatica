import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/Auth";
import Header from "../../../components/Header";
import {
  Container,
  ErrorMessage,
  Loader,
  Title,
  GroupTitle,
  StatusCell,
  Section,
  ToggleButton,
  GroupContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Card,
} from "./styles";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface IFrequencia {
  id_frequencia: number;
  data: string;
  status: "P" | "F" | "J";
  turma_id: number;
}

interface FrequenciaAgrupada {
  mesAno: string;
  dias: { dia: string; status: "P" | "F" | "J" }[];
}

const FrequenciaAlunoPage: React.FC = () => {
  const [frequencias, setFrequencias] = useState<IFrequencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user } = useAuth();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchFrequencias = async () => {
      try {
        const response = await api.get(`/frequencia/aluno/${user?.dados.id}`);
        setFrequencias(response.data);
      } catch {
        setError("Erro ao carregar as frequências");
      } finally {
        setLoading(false);
      }
    };
    fetchFrequencias();
  }, [user]);

  const agruparPorMesAno = (): FrequenciaAgrupada[] => {
    const grupos: { [key: string]: { dia: string; status: "P" | "F" | "J" }[] } = {};

    frequencias.forEach((freq) => {
      const dataObj = new Date(freq.data);
      const mesAno = dataObj.toLocaleString("pt-BR", { month: "long", year: "numeric" });
      const dia = String(dataObj.getDate()).padStart(2, "0");

      if (!grupos[mesAno]) {
        grupos[mesAno] = [];
      }
      grupos[mesAno].push({ dia, status: freq.status });
    });

    return Object.entries(grupos).map(([mesAno, dias]) => ({
      mesAno,
      dias: dias.sort((a, b) => Number(a.dia) - Number(b.dia)),
    }));
  };

  const grupos = agruparPorMesAno();

  const mesAtual = new Date().toLocaleString("pt-BR", { month: "long", year: "numeric" });

  const toggleExpand = (mesAno: string) => {
    setExpanded((prev) => ({
      ...prev,
      [mesAno]: !prev[mesAno],
    }));
  };

  return (
    <>
      <Header />
      <Container>
        <Card>
          <Title>Minha Frequência</Title>

          {loading && <Loader>Carregando...</Loader>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!loading && !error && grupos.length === 0 && <p>Não há registros de frequência.</p>}

          {grupos.map((grupo) => {
            const isMesAtual = grupo.mesAno === mesAtual;
            const isExpanded = expanded[grupo.mesAno] || isMesAtual;

            const totalDias = grupo.dias.length;
            const totalPresentes = grupo.dias.filter((d) => d.status === "P").length;
            const porcentagem = totalDias > 0 ? ((totalPresentes / totalDias) * 100).toFixed(0) : "0";

            return (
              <GroupContainer key={grupo.mesAno}>
                <ToggleButton onClick={() => toggleExpand(grupo.mesAno)}>
                  <GroupTitle>
                    {grupo.mesAno.toUpperCase()} - {porcentagem}% Presença
                  </GroupTitle>
                  {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </ToggleButton>

                {isExpanded && (
                  <Section>
                    <Table>
                      <TableHeader>
                        {grupo.dias.map((d, idx) => (
                          <TableCell key={idx}>{d.dia}</TableCell>
                        ))}
                      </TableHeader>
                      <TableRow>
                        {grupo.dias.map((d, idx) => (
                          <StatusCell key={idx} status={d.status}>
                            {d.status}
                          </StatusCell>
                        ))}
                      </TableRow>
                    </Table>
                  </Section>
                )}
              </GroupContainer>
            );
          })}
        </Card>
      </Container>
    </>
  );
};

export default FrequenciaAlunoPage;
