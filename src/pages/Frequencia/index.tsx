import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Header from "../../components/Header";
import { api } from "../../services/api";
import { AlunoData, TurmaData } from "../../utils/types";
import { toast } from "react-toastify";
import SelectField from "../../components/Selects";
import InputField from "../../components/Inputs/InputField";
import Button from "../../components/Button";

interface Frequencia {
  aluno_id: number;
  status: "P" | "F" | "J";
}

interface FrequenciaAgrupada {
  aluno_id: number;
  nome_aluno: string;
  frequencias: {
    id_frequencia: number;
    data: string;
    status: "P" | "F" | "J";
  }[];
}

const FrequenciaPage: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaData[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [turmaVisualizar, setTurmaVisualizar] = useState("");
  const [data, setData] = useState("");
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [frequencias, setFrequencias] = useState<Frequencia[]>([]);
  const [frequenciasRegistradas, setFrequenciasRegistradas] = useState<FrequenciaAgrupada[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Carrega turmas
  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get("/turmas?status=P");
        setTurmas(response.data);
      } catch {
        setError("Erro ao buscar turmas.");
      }
    };
    fetchTurmas();
  }, []);

  useEffect(() => {
    if (!turmaSelecionada) return;
    const fetchAlunos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/turmas/${turmaSelecionada}/alunos`);
        setAlunos(response.data);
      } catch {
        setError("Erro ao buscar alunos.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, [turmaSelecionada]);

  // 📜 Carrega frequências agrupadas da turma selecionada para visualizar
  useEffect(() => {
    if (!turmaVisualizar) {
      setFrequenciasRegistradas([]);
      return;
    }
    const fetchFrequenciasRegistradas = async () => {
      try {
        const response = await api.get(`/frequencia/turma/${turmaVisualizar}/agrupado`);
        setFrequenciasRegistradas(response.data);
      } catch {
        toast.error("Erro ao buscar frequências registradas.");
      }
    };
    fetchFrequenciasRegistradas();
  }, [turmaVisualizar]);


  const handleStatusChange = (aluno_id: number, status: "P" | "F" | "J") => {
    setFrequencias((prev) => {
      const updated = prev.filter((f) => f.aluno_id !== aluno_id);
      return [...updated, { aluno_id, status }];
    });
  };


  const handleSubmit = async () => {
    if (!turmaSelecionada || !data) {
      toast.warn("Selecione uma turma e a data.");
      return;
    }

    const payload = { turma_id: turmaSelecionada, data, frequencias };

    try {
      await api.post("/frequencia", payload);
      toast.success("Frequência registrada com sucesso!");
      setFrequencias([]);
    } catch {
      toast.error("Erro ao registrar frequência.");
    }
  };

  // 📅 Datas únicas registradas na turma
  const uniqueDates = Array.from(new Set(frequenciasRegistradas.flatMap((aluno) => aluno.frequencias.map((f) => f.data)))).sort();

  // 🔢 Calcula a porcentagem de presença
  const calcularPorcentagem = (frequencias: FrequenciaAgrupada["frequencias"]) => {
    const totalDias = uniqueDates.length;
    const presencas = frequencias.filter((f) => f.status === "P").length;
    const percentual = totalDias ? (presencas / totalDias) * 100 : 0;
    return percentual.toFixed(0);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.HeaderFrequencia>Registro de frequência</S.HeaderFrequencia>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <S.FormFrequencia>
          <S.Section>
            <SelectField value={turmaSelecionada} onChange={(e) => setTurmaSelecionada(e.target.value)}>
              <option value="">Selecione a Turma</option>
              {turmas.map((turma) => (
                <option key={turma.id_turma} value={String(turma.id_turma)}>
                  {turma.nome_turma}
                </option>
              ))}
            </SelectField>
          </S.Section>

          <S.Section>
            <InputField type="date" label="Data da Aula" value={data} onChange={(e) => setData(e.target.value)} />
          </S.Section>

          {loading ? (
            <S.Loading>Carregando alunos...</S.Loading>
          ) : alunos.length === 0 ? (
            <S.Loading>Selecione uma turma para carregar alunos.</S.Loading>
          ) : (
            alunos.map((aluno) => (
              <S.AlunoItem key={aluno.id_aluno}>
                <S.AlunoName>{aluno.nome_aluno}</S.AlunoName>
                <S.RadioGroup>
                  {["P", "F", "J"].map((status) => (
                    <S.RadioLabel key={status}>
                      <S.Radio
                        type="radio"
                        name={`status-${aluno.id_aluno}`}
                        onChange={() => handleStatusChange(Number(aluno.id_aluno), status as "P" | "F" | "J")}
                      />
                      {status}
                    </S.RadioLabel>
                  ))}
                </S.RadioGroup>
              </S.AlunoItem>
            ))
          )}

          <Button onClick={handleSubmit}>Salvar Frequência</Button>
        </S.FormFrequencia>

        <S.ViewSection>
          <S.HeaderViewFreq>
            <S.SubTitle>Visualizar frequências da turma</S.SubTitle>
            <SelectField value={turmaVisualizar} onChange={(e) => setTurmaVisualizar(e.target.value)}>
              <option value="" disabled>
                Selecione a Turma
              </option>
              {turmas.map((turma) => (
                <option key={turma.id_turma} value={String(turma.id_turma)}>
                  {turma.nome_turma}
                </option>
              ))}
            </SelectField>
          </S.HeaderViewFreq>

          {frequenciasRegistradas.length > 0 ? (
            <>
              <S.SubTitle>Frequências Registradas</S.SubTitle>
              <S.Table>
                <thead>
                  <tr>
                    <th>Aluno</th>
                    {uniqueDates.map((data) => (
                      <th key={data}>{data}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {frequenciasRegistradas.map((aluno) => (
                    <tr key={aluno.aluno_id}>
                      <td>
                        {aluno.nome_aluno} ({calcularPorcentagem(aluno.frequencias)}%)
                      </td>
                      {uniqueDates.map((data) => {
                        const frequencia = aluno.frequencias.find((f) => f.data === data);
                        return <td key={data}>{frequencia ? frequencia.status : "-"}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </>
          ) : (
            turmaVisualizar && <S.NoData>Nenhuma frequência registrada para esta turma.</S.NoData>
          )}
        </S.ViewSection>
      </S.Container>
    </>
  );
};

export default FrequenciaPage;
