import React, { useEffect, useState, useReducer } from "react";
import Header from "../../components/Header";
import {
  Container,
  HeaderBoletim,
  Form,
  InputNota,
  Table,
  Overlay,
  Modal,
  ModalContent,
  CheckboxList,
  CheckboxItem,
  ButtonController,
  ContainerNotas,
} from "./styles";
import { api } from "../../services/api";
import { AlunoData, TurmaData } from "../../utils/types";
import SelectField from "../../components/Selects";
import CloseButton from "../../components/CloseButton";
import Button from "../../components/Button";
import { toast } from "react-toastify";

interface Materia {
  id_materia: number;
  nome: string;
}

interface Nota {
  id_aluno: number;
  id_materia: number;
  nota: number;
}

type Action = { type: "ATIVAR_ADICIONAR" } | { type: "ATIVAR_EDITAR" } | { type: "CANCELAR" };

type State = {
  modoAdicionar: boolean;
  modoEditar: boolean;
};

const initialState: State = {
  modoAdicionar: false,
  modoEditar: false,
};

function modoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ATIVAR_ADICIONAR":
      return state.modoAdicionar ? initialState : { modoAdicionar: true, modoEditar: false };
    case "ATIVAR_EDITAR":
      return state.modoEditar ? initialState : { modoAdicionar: false, modoEditar: true };
    case "CANCELAR":
      return initialState;
    default:
      return state;
  }
}

const BoletimPage: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaData[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [materiasTurma, setMateriasTurma] = useState<Materia[]>([]);
  const [boletim, setBoletim] = useState<Nota[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<number | null>(null);
  const [notasNovas, setNotasNovas] = useState<{ [key: string]: number | string }>({});
  const [notasEditadas, setNotasEditadas] = useState<{ [key: string]: number | string }>({});
  const [showModal, setShowModal] = useState(false);
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<number[]>([]);
  const [modo, dispatch] = useReducer(modoReducer, initialState);

  useEffect(() => {
    fetchTurmas();
    fetchMaterias();
  }, []);

  useEffect(() => {
    if (turmaSelecionada) {
      fetchAlunos(turmaSelecionada);
      fetchMateriasDaTurma(turmaSelecionada);
      fetchNotas(turmaSelecionada);
    }
  }, [turmaSelecionada]);

  const fetchTurmas = async () => {
    const response = await api.get("/turmas");
    setTurmas(response.data);
  };

  const fetchMaterias = async () => {
    const response = await api.get("/materia");
    setMaterias(response.data);
  };

  const fetchAlunos = async (turmaId: number) => {
    const response = await api.get(`/turmas/${turmaId}/alunos`);
    setAlunos(response.data);
  };

  const fetchMateriasDaTurma = async (turmaId: number) => {
    const response = await api.get(`/turmas/${turmaId}/materia`);
    setMateriasTurma(response.data.materias);
    setMateriasSelecionadas(response.data.materias.map((m: Materia) => m.id_materia));
  };

  const fetchNotas = async (turmaId: number) => {
    try {
      const response = await api.get(`/nota/turma/${turmaId}`);
      const dados = response.data;
      const dadosConvertidos = dados.map((nota: any) => ({
        id_aluno: nota.aluno_id,
        id_materia: nota.materia_id,
        nota: nota.nota,
      }));
      setBoletim(dadosConvertidos);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  };

  const atualizarNotaNoEstado = (alunoId: number, materiaId: number, value: string) => {
    const key = `${alunoId}_${materiaId}`;
    if (modo.modoAdicionar) {
      setNotasNovas((prev) => ({
        ...prev,
        [key]: value === "" ? "" : parseFloat(value),
      }));
    } else if (modo.modoEditar) {
      setNotasEditadas((prev) => ({
        ...prev,
        [key]: value === "" ? "" : parseFloat(value),
      }));
    }
  };

  const handleSubmitNotas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turmaSelecionada) return;

    try {
      if (modo.modoAdicionar) {
        const novasNotasArray = Object.entries(notasNovas)
          .filter(([, nota]) => nota !== "")
          .map(([key, nota]) => {
            const [alunoId, materiaId] = key.split("_").map(Number);
            return {
              aluno_id: alunoId,
              materia_id: materiaId,
              nota: Number(nota),
              turma_id: turmaSelecionada,
            };
          });

        if (novasNotasArray.length === 0) {
          toast.info("Nenhuma nova nota para adicionar.");
          return;
        }

        await api.post("/nota", novasNotasArray);
        toast.success("Novas notas adicionadas com sucesso!");
      } else if (modo.modoEditar) {
        const notasEditadasArray = Object.entries(notasEditadas).map(([key, nota]) => {
          const [alunoId, materiaId] = key.split("_").map(Number);
          return {
            aluno_id: alunoId,
            materia_id: materiaId,
            nota,
            turma_id: turmaSelecionada,
          };
        });

        if (notasEditadasArray.length === 0) {
          toast.info("Nenhuma nota foi alterada.");
          return;
        }

        await api.put("/nota", notasEditadasArray);
        toast.success("Notas atualizadas com sucesso!");
      }

      setNotasNovas({});
      setNotasEditadas({});
      fetchNotas(turmaSelecionada);
      dispatch({ type: "CANCELAR" });
    } catch (error) {
      console.error("Erro ao registrar notas", error);
      toast.error("Erro ao registrar notas.");
    }
  };

  const handleMateriaCheckbox = (materiaId: number) => {
    setMateriasSelecionadas((prev) => (prev.includes(materiaId) ? prev.filter((id) => id !== materiaId) : [...prev, materiaId]));
  };

  const houveMudancas = () => {
    if (!turmaSelecionada) return false;
    const materiasVinculadas = materiasTurma.map(m => m.id_materia);
    return (
      materiasSelecionadas.length !== materiasVinculadas.length ||
      !materiasSelecionadas.every(id => materiasVinculadas.includes(id)) ||
      !materiasVinculadas.every(id => materiasSelecionadas.includes(id))
    );
  };

  const handleVincularMaterias = async () => {
    if (!turmaSelecionada) return;

    try {
      await api.post(`/turmas/${turmaSelecionada}/materia`, { materias_ids: materiasSelecionadas });
      toast.success("Matérias vinculadas com sucesso!");
      setShowModal(false);
      fetchMateriasDaTurma(turmaSelecionada);
    } catch (error) {
      console.error("Erro ao vincular matérias", error);
      toast.error("Erro ao vincular matérias.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMateriasSelecionadas(materiasTurma.map(m => m.id_materia));
  };

  return (
    <>
      <Header />
      <Container>
        <HeaderBoletim>Registro de Notas</HeaderBoletim>

        <SelectField style={{maxWidth:"350px"}} onChange={(e) => setTurmaSelecionada(Number(e.target.value))} defaultValue="">
          <option value="" disabled>
            Selecione a Turma
          </option>
          {turmas.map((turma) => (
            <option key={turma.id_turma} value={Number(turma.id_turma)}>
              {turma.nome_turma}
            </option>
          ))}
        </SelectField>

        {turmaSelecionada && (
          <ContainerNotas>
            <Button style={{maxWidth:"350px"}} type="button" onClick={() => setShowModal(true)}>
              Adicionar Matérias
            </Button>

            <Form onSubmit={handleSubmitNotas}>
              <Table>
                <thead>
                  <tr>
                    <th>Aluno</th>
                    {materiasTurma.map((materia) => (
                      <th key={materia.id_materia}>{materia.nome}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.id_aluno}>
                      <td>{aluno.nome_aluno}</td>
                      {materiasTurma.map((materia) => {
                        const key = `${aluno.id_aluno}_${materia.id_materia}`;
                        const notaExistente = boletim.find(
                          (nota) => nota.id_aluno === aluno.id_aluno && nota.id_materia === materia.id_materia
                        );

                        const valorNota = modo.modoAdicionar
                          ? notasNovas[key] ?? ""
                          : modo.modoEditar
                          ? notasEditadas[key] ?? notaExistente?.nota ?? ""
                          : "";

                        return (
                          <td key={materia.id_materia}>
                            {modo.modoAdicionar ? (
                              !notaExistente ? (
                                <InputNota
                                  type="number"
                                  value={valorNota}
                                  onChange={(e) =>
                                    atualizarNotaNoEstado(Number(aluno.id_aluno), materia.id_materia, e.target.value)
                                  }
                                />
                              ) : (
                                <span>{notaExistente.nota}</span>
                              )
                            ) : modo.modoEditar ? (
                              notaExistente ? (
                                <InputNota
                                  type="number"
                                  value={valorNota}
                                  onChange={(e) =>
                                    atualizarNotaNoEstado(Number(aluno.id_aluno), materia.id_materia, e.target.value)
                                  }
                                />
                              ) : (
                                <span>-</span>
                              )
                            ) : (
                              <span>{notaExistente?.nota ?? "-"}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ButtonController>
                <Button type="button" onClick={() => dispatch({ type: "ATIVAR_ADICIONAR" })}>
                  {modo.modoAdicionar ? "Cancelar Adição" : "Adicionar Notas"}
                </Button>

                <Button type="button" onClick={() => dispatch({ type: "ATIVAR_EDITAR" })}>
                  {modo.modoEditar ? "Cancelar Edição" : "Editar Notas"}
                </Button>

                <Button
                  type="submit"
                  disabled={!(modo.modoAdicionar || modo.modoEditar)}
                  style={{
                    backgroundColor: modo.modoAdicionar || modo.modoEditar ? "" : "gray",
                    cursor: modo.modoAdicionar || modo.modoEditar ? "pointer" : "not-allowed",
                  }}
                >
                  Salvar Notas
                </Button>
              </ButtonController>
            </Form>
          </ContainerNotas>
        )}

        {showModal && (
          <Overlay>
            <Modal>
              <CloseButton onClick={handleCloseModal} tamanho={20} style={{ color: "black" }} />
              <ModalContent>
                <h2>Selecionar Matérias para a Turma</h2>
                <CheckboxList>
                  {materias.map((materia) => (
                    <CheckboxItem key={materia.id_materia}>
                      <input
                        className="checkboxInput"
                        type="checkbox"
                        id={`materia-${materia.id_materia}`}
                        checked={materiasSelecionadas.includes(materia.id_materia)}
                        onChange={() => handleMateriaCheckbox(materia.id_materia)}
                      />
                      <label className="checkboxLabel" htmlFor={`materia-${materia.id_materia}`}>{materia.nome}</label>
                    </CheckboxItem>
                  ))}
                </CheckboxList>
                <Button 
                  onClick={handleVincularMaterias}
                  disabled={!houveMudancas()}
                  style={{
                    backgroundColor: houveMudancas() ? '' : 'gray',
                    cursor: houveMudancas() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Salvar
                </Button>
              </ModalContent>
            </Modal>
          </Overlay>
        )}
      </Container>
    </>
  );
};

export default BoletimPage;