import { useState, useEffect } from "react";
import Header from "../../components/Header";
import DialogCadastro from "../../components/ModalCadastro";
import {
  ActionButton,
  Actions,
  AutoCompleteWrapper,
  ContainerAluno,
  ContainerInput,
  DivSecao,
  FormContainer,
  HeaderAluno,
  InputCheckbox,
} from "./style";
import { BiUserCheck, BiUserPlus } from "react-icons/bi";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import InputField from "../../components/Inputs/InputField";
import InputMask from "../../components/Inputs/InputMask";
import SelectField from "../../components/Selects";
import { darkTheme } from "../../themes";
import { AlunoData } from "../../utils/types";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import AlunosList from "./ListAluno";
import { SearchInput } from "../../components/Inputs/InputSearch";
import Swal from "sweetalert2";
import { showAlert } from "../../utils/showAlert";

function AlunosPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMatriculaOpen, setIsMatriculaOpen] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [busca, setBusca] = useState("");
  const [responsavelEncontrado, setResponsavelEncontrado] = useState(false);
  const [alunoOptions, setAlunoOptions] = useState<Option[]>([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState<Option[]>([]);

  type Option = {
    id: string | number;
    label: string;
  };

  const methods = useForm<AlunoData>();
  const { register, handleSubmit, setValue, reset, watch } = methods;
  const temResponsavel = watch("tem_responsavel");
  const matriculaForm = useForm<{ aluno_id: string; turma_id: string }>();
  const {
    register: registerMatricula,
    handleSubmit: handleSubmitMatricula,
    reset: resetMatricula,
    setValue: setMatriculaValue,
  } = matriculaForm;

  useEffect(() => {
    if (isMatriculaOpen) {
      api.get("/turmas?status=A&status=P").then((res) => setTurmas(res.data));
    }
  }, [isMatriculaOpen]);

  const handleCloseModal = () => {
    reset();
    resetResponsavelFields();
    setResponsavelEncontrado(false);
    setIsDialogOpen(false);
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

  const handleAlunoBusca = async (search: string) => {
    if (search.length === 3) {
      await buscarAlunos(search); // Faz apenas 1 chamada
    } else if (search.length > 3) {
      const filtrados = alunoOptions.filter((a) => a.label.toLowerCase().includes(search.toLowerCase()));
      setAlunosFiltrados(filtrados);
    } else {
      setAlunosFiltrados([]);
    }
  };

  const buscarAlunos = async (search: string) => {
    try {
      const res = await api.get(`/alunos/listarAlunos?search=${search}&status=N`);
      console.log("Buscou alunos:", res.data);
      const data = res.data.map((a: any) => ({
        id: a.id_aluno,
        label: `${a.nome_aluno} - CPF${a.cpf_aluno}`,
      }));
      setAlunoOptions(data);
      setAlunosFiltrados(data);
    } catch {
      toast.error("Erro ao buscar alunos.");
    }
  };

  const buscarResponsavel = async (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, ""); // Remove não-numéricos

    if (cpfLimpo.length === 11) {
      try {
        console.log("Tentando buscar responsavel");
        const response = await api.get("/alunos/responsavel", {
          params: {
            cpf_responsavel: cpfLimpo,
          },
        });

        const { encontrado, responsavel } = response.data;

        if (encontrado && responsavel) {
          setResponsavelEncontrado(true);
          setValue("responsavel.nome_responsavel", responsavel.nome || "");
          setValue("responsavel.cpf_responsavel", responsavel.cpf || cpf);
          setValue("responsavel.telefone_responsavel", responsavel.telefone || "");
        } else {
          setResponsavelEncontrado(false);
          resetResponsavelFields();
        }
      } catch (error) {
        console.error("Erro ao buscar responsável:", error);
        setResponsavelEncontrado(false);
        resetResponsavelFields();
      }
    }
  };

  // Função para limpar campos do responsável
  const resetResponsavelFields = () => {
    setValue("responsavel.nome_responsavel", "");
    setValue("responsavel.cpf_responsavel", "");
    setValue("responsavel.telefone_responsavel", "");
  };

  const cadastrarAluno: SubmitHandler<AlunoData> = async (data) => {
    try {
      console.log(data);
      const response = await api.post("/alunos/cadastrar", data);
      if (response.status === 201) {
        toast.success("Aluno cadastrado com sucesso!");
        reset();
        resetResponsavelFields();
        setResponsavelEncontrado(false);
      } else {
        toast.error("Falha ao cadastrar o aluno. Tente novamente.");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro: ${error.response.data.message}`);
      } else if (error.response && typeof error.response.data === "string") {
        toast.error(`Erro: ${error.response.data}`);
      } else {
        toast.error("Erro no cadastro. Verifique os dados e tente novamente.");
      }
    }
  };

  const matricularAluno: SubmitHandler<{ aluno_id: string; turma_id: string }> = async (data) => {
    try {
      const response = await api.post("/alunos/matricular", data);

      if (response.status === 201) {
        const { tipo_usuario, cpf, senha } = response.data;

        toast.success("Aluno matriculado com sucesso!");
        resetMatricula();
        setBusca("");
        setIsMatriculaOpen(false);

        showAlert({
          title: "Cadastro Criado",
          html: `
      <p><strong>Tipo de Usuário:</strong> ${tipo_usuario}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Senha:</strong> 
        <span id="senhaTexto" style="font-weight:bold; color:#d62828;">${senha}</span>
      </p>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <button id="copiarSenhaBtn" style="
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          font-size: 13px;
          background-color: #eeeeee;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copiar
        </button>
      </div>
      <p style="margin-top: 20px; color: #ff0000;">
        <em>Importante: anote esta senha com segurança. Ela não será exibida novamente!</em>
      </p>
    `,
          icon: "info",
          confirmText: "Entendi",
          confirmColor: "#006eff",
          customRender: () => {
            const btn = document.getElementById("copiarSenhaBtn");
            const senhaText = document.getElementById("senhaTexto")?.textContent;

            btn?.addEventListener("click", () => {
              if (senhaText) {
                navigator.clipboard.writeText(senhaText).then(() => {
                  btn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="none" stroke="green" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Copiado
            `;
                  setTimeout(() => {
                    btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copiar
              `;
                  }, 3000);
                });
              }
            });
          },
        });
      } else if (response.status === 200) {
        toast.success(response.data.message || "Aluno matriculado com sucesso.");
        resetMatricula();
        setBusca("");
        setIsMatriculaOpen(false);
      } else {
        toast.error("Falha ao matricular. Tente novamente.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao matricular. Verifique os dados e tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <ContainerAluno>
        <HeaderAluno>
          <h1>Gerenciamento de Alunos</h1>
        </HeaderAluno>

        <Actions>
          <ActionButton onClick={() => setIsDialogOpen(true)}>
            <BiUserPlus size={20} />
            <span>Cadastrar Aluno</span>
          </ActionButton>
          <ActionButton onClick={() => setIsMatriculaOpen(true)}>
            <BiUserCheck size={20} />
            <span>Matricular Aluno</span>
          </ActionButton>
        </Actions>

        {isDialogOpen && (
          <DialogCadastro isOpen={isDialogOpen} onClose={handleCloseModal} title="Aluno - Cadastro">
            <FormProvider {...methods}>
              <FormContainer onSubmit={handleSubmit(cadastrarAluno)}>
                <ContainerInput>
                  <DivSecao>
                    <h1>Dados do Aluno</h1>
                    <InputField type="text" label="Nome Completo:" {...register("nome_aluno", { required: true })} />
                    <InputMask
                      label="Telefone"
                      mask="(99)99999-9999"
                      onChange={(e) => setValue("telefone_aluno", e.target.value)}
                    />
                    <InputMask label="CPF" mask="999.999.999-99" onChange={(e) => setValue("cpf_aluno", e.target.value)} />
                    <InputField type="date" label="Data Nascimento:" {...register("data_nascimento", { required: true })} />
                    <SelectField {...register("sexo", { required: true })} defaultValue="">
                      <option value="" disabled>
                        Selecione o sexo
                      </option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </SelectField>
                    <InputCheckbox>
                      <input type="checkbox" {...register("tem_responsavel")} id="temResponsavel" />
                      <label htmlFor="temResponsavel">Tem Responsável?</label>
                    </InputCheckbox>
                  </DivSecao>

                  {temResponsavel && (
                    <DivSecao>
                      <input type="hidden" {...register("responsavel.id_responsavel")} />

                      <h1>Dados do Responsável</h1>
                      <InputMask
                        label="CPF do Responsável:"
                        mask="999.999.999-99"
                        onChange={(e) => {
                          setValue("responsavel.cpf_responsavel", e.target.value);
                          buscarResponsavel(e.target.value);
                        }}
                        onBlur={(e) => buscarResponsavel(e.target.value)}
                        style={{
                          borderBottom: responsavelEncontrado ? "2px solid green" : "1px solid gray",
                        }}
                      />

                      <InputField type="text" label="Nome do Responsável:" {...register("responsavel.nome_responsavel")} />

                      <InputMask
                        label="Telefone do Responsável:"
                        mask="(99)99999-9999"
                        value={watch("responsavel.telefone_responsavel")}
                        onChange={(e) => {
                          setValue("responsavel.telefone_responsavel", e.target.value);
                        }}
                      />
                    </DivSecao>
                  )}
                  <DivSecao>
                    <h1>Endereço</h1>
                    <InputField type="text" label="Estado:" {...register("endereco.estado", { required: true })} />
                    <InputMask label="CEP" mask="99999-999" onChange={(e) => setValue("endereco.cep", e.target.value)} />
                    <InputField type="text" label="Cidade:" {...register("endereco.cidade", { required: true })} />
                    <InputField type="text" label="Bairro:" {...register("endereco.bairro")} />
                    <InputField type="text" label="Rua:" {...register("endereco.rua")} />
                    <InputField type="text" label="Número:" {...register("endereco.numero")} />
                    <InputField type="text" label="Povoado:" {...register("endereco.povoado")} />
                  </DivSecao>
                </ContainerInput>

                <div className="DivBotom">
                  <Button style={{ backgroundColor: darkTheme.colors.secundary }}>Salvar</Button>
                </div>
              </FormContainer>
            </FormProvider>
          </DialogCadastro>
        )}

        {isMatriculaOpen && (
          <DialogCadastro
            isOpen={isMatriculaOpen}
            onClose={() => {
              setIsMatriculaOpen(false);
              resetMatricula();
              setBusca(""); // Aqui!
            }}
            title="Matrícula de Aluno"
          >
            <FormProvider {...matriculaForm}>
              <form onSubmit={handleSubmitMatricula(matricularAluno)}>
                <AutoCompleteWrapper>
                  <SearchInput
                    value={busca}
                    onChange={(val, selected) => {
                      setBusca(val);
                      handleAlunoBusca(val);
                      if (selected) {
                        setMatriculaValue("aluno_id", String(selected.id));
                      }
                    }}
                    options={alunosFiltrados}
                    label="Buscar Aluno:"
                  />
                </AutoCompleteWrapper>

                <SelectField {...registerMatricula("turma_id")} defaultValue="">
                  <option value="" disabled>
                    Selecione a turma
                  </option>
                  {turmas.map((turma: any) => {
                    const emoji = getStatusEmoji(turma.status);
                    return (
                      <option key={turma.id_turma} value={turma.id_turma}>
                        {`${emoji} ${turma.nome_turma} - ${turma.horario} - ${turma.total_alunos}`}
                      </option>
                    );
                  })}
                </SelectField>

                <div className="DivBotom">
                  <Button style={{ backgroundColor: darkTheme.colors.secundary, marginTop: "10px" }}>Matricular</Button>
                </div>
              </form>
            </FormProvider>
          </DialogCadastro>
        )}

        <AlunosList />
      </ContainerAluno>
    </>
  );
}

export default AlunosPage;
