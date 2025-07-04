import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/Auth";
import Header from "../../../components/Header";
import {
  Container,
  Title,
  Card,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  SubjectCell,
  GradeCell,
  ErrorContainer,
  AverageRow,
  AverageCell,
  EmptyState,
  LoadingContainer,
  StatusIndicator,
} from "./styles";
import { FiInfo } from "react-icons/fi";
import GeneralLoading from "../../../components/GeneralLoading";

interface MateriaNota {
  materia_id: number;
  materia_nome: string;
  nota_id: number | null;
  nota_valor: number | null;
}

interface NotasResponse {
  total_materias: number;
  notas: MateriaNota[];
}

const BoletimAlunoPage: React.FC = () => {
  const { user } = useAuth();
  const [notas, setNotas] = useState<MateriaNota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        setLoading(true);
        const response = await api.get<NotasResponse>(`/nota/aluno/${user?.dados.id}`);
        setNotas(response.data.notas);
        calculateAverage(response.data.notas);
      } catch (err) {
        setError("Erro ao carregar notas. Tente novamente mais tarde.");
        console.error("Failed to load grades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();
  }, [user?.dados.id]);

  const calculateAverage = (notasData: MateriaNota[]) => {
    const validGrades = notasData.filter((nota) => nota.nota_valor !== null).map((nota) => nota.nota_valor as number);

    if (validGrades.length === 0) {
      setAverage(null);
      return;
    }

    const sum = validGrades.reduce((acc, nota) => acc + nota, 0);
    const avg = sum / validGrades.length;
    setAverage(avg);
  };

  const getStatusColor = (nota: number | null) => {
    if (nota === null) return "#9E9E9E"; // Cinza para não avaliado
    if (nota >= 5) return "#4CAF50"; // Aprovado
    // if (nota >= 5) return "#FFC107"; // Recuperação
    return "#F44336"; // Reprovado
  };

  const getStatusText = (nota: number | null) => {
    if (nota === null) return "Não avaliado";
    if (nota >= 5) return "Aprovado";
    // if (nota >= 5) return "Recuperação";
    return "Reprovado";
  };

  return (
    <>
      <Header />
      <Container>
        <Card>
          <Title>Minhas Notas</Title>

          {loading ? (
            <LoadingContainer>
              <GeneralLoading />
            </LoadingContainer>
          ) : error ? (
            <ErrorContainer>
              <FiInfo size={24} />
              <p>{error}</p>
            </ErrorContainer>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Matéria</TableHeader>
                    <TableHeader>Nota</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {notas.length > 0 ? (
                    <>
                      {notas.map((nota) => (
                        <TableRow key={`${nota.materia_id}`}>
                          <SubjectCell>{nota.materia_nome}</SubjectCell>
                          <GradeCell>{nota.nota_valor !== null ? nota.nota_valor.toFixed(1) : "-"}</GradeCell>
                          <TableCell>
                            <StatusIndicator color={getStatusColor(nota.nota_valor)} />
                            {getStatusText(nota.nota_valor)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <AverageRow>
                        <AverageCell colSpan={2}>Média Geral:</AverageCell>
                        <AverageCell highlight={average !== null && average >= 6}>
                          {average?.toFixed(1) || "-"}
                        </AverageCell>
                      </AverageRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <EmptyState>
                          <FiInfo size={48} />
                          <p>Nenhuma matéria registrada</p>
                        </EmptyState>
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Container>
    </>
  );
};

export default BoletimAlunoPage;
