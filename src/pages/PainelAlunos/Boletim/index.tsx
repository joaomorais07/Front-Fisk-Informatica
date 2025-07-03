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
  Tooltip
} from "./styles";
import { FiInfo } from "react-icons/fi";
import GeneralLoading from "../../../components/GeneralLoading";

interface Nota {
  aluno_id: number;
  materia_id: number;
  materia_nome: string;
  turma_id: number;
  nota: number;
  data_avaliacao?: string;
}

const BoletimAlunoPage: React.FC = () => {
  const { user } = useAuth();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/nota/aluno/${user?.dados.id}`);
        setNotas(response.data);
        calculateAverage(response.data);
      } catch (err) {
        setError("Erro ao carregar notas. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();
  }, [user?.dados.id]);

  const calculateAverage = (notasData: Nota[]) => {
    if (notasData.length === 0) {
      setAverage(null);
      return;
    }
    const sum = notasData.reduce((acc, nota) => acc + nota.nota, 0);
    const avg = sum / notasData.length;
    setAverage(avg);
  };

  const getStatusColor = (nota: number) => {
    if (nota >= 7) return '#4CAF50'; // Aprovado
    if (nota >= 5) return '#FFC107'; // Recuperação
    return '#F44336'; // Reprovado
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
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
                        <TableRow key={`${nota.materia_id}-${nota.turma_id}`}>
                          <SubjectCell>{nota.materia_nome}</SubjectCell>
                          <GradeCell>{nota.nota.toFixed(1)}</GradeCell>
                          <TableCell>
                            <StatusIndicator color={getStatusColor(nota.nota)} />
                            {nota.nota >= 7 ? 'Aprovado' : nota.nota >= 5 ? 'Recuperação' : 'Reprovado'}
                          </TableCell>
                        </TableRow>
                      ))}
                      <AverageRow>
                        <AverageCell colSpan={2}>Média Geral:</AverageCell>
                        <AverageCell highlight={average !== null && average >= 6}>
                          {average?.toFixed(1) || '-'}
                        </AverageCell>
              
                      </AverageRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <EmptyState>
                          <FiInfo size={48} />
                          <p>Nenhuma nota registrada ainda</p>
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