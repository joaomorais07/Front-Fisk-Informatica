import { useState } from "react";
import Header from "../../components/Header";
import DialogCadastro from "../../components/ModalCadastro";
import {
  ActionButton,
  Actions,
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


function FuncionarioPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<AlunoData>();
  const { register, handleSubmit, setValue, reset, watch } = methods;

  // Verifica o estado do campo "temResponsavel"
  const temResponsavel = watch("tem_responsavel");

  const cadastrarAluno: SubmitHandler<AlunoData> = async (data) => {
    try {
      const response = await api.post("/alunos/cadastrar", data);

      if (response.status === 201) {
        toast.success("Aluno cadastrado com sucesso!");
        reset(); // Limpa o formulário
      } else {
        toast.error("Falha ao cadastrar o aluno. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      toast.error("Erro no cadastro. Verifique os dados e tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <ContainerAluno>
        <HeaderAluno>
          <h1>Gerenciamento de Funcionarios</h1>
        </HeaderAluno>

        <Actions>
          <ActionButton onClick={() => setIsDialogOpen(true)}>
            <BiUserPlus size={20} />
            <span>Cadastrar Funcionario</span>
          </ActionButton>
  
        </Actions>

        {/* Modal de Cadastro */}
        {isDialogOpen && (
          <DialogCadastro isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Aluno - Cadastro">
            <FormProvider {...methods}>
              <FormContainer onSubmit={handleSubmit(cadastrarAluno)}>
                <ContainerInput>
                  {/* Seção de Dados do Aluno */}
                  <DivSecao>
                    <h1>Dados do Funcionario</h1>
                    <InputField type="text" label="Nome Completo:" {...register("nome_aluno", { required: true })} />
                    <InputMask label="Telefone" mask="(99)99999-9999" onChange={(e) => setValue("telefone_aluno", e.target.value)} />
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

                  {/* Renderizar "Dados do Responsável" apenas se "temResponsavel" for true */}
                  {temResponsavel && (
                    <DivSecao>
                      <h1>Dados do Responsável</h1>
                      <InputField
                        type="text"
                        label="Nome do Responsável:"
                        {...register("responsavel.nome_responsavel", { required: true })}
                      />
                      <InputMask
                        label="CPF do Responsável:"
                        mask="999.999.999-99"
                        onChange={(e) => setValue("responsavel.cpf_responsavel", e.target.value)}
                      />
                      <InputMask
                        label="Telefone do Responsável:"
                        mask="(99)99999-9999"
                        onChange={(e) => setValue("responsavel.telefone_responsavel", e.target.value)}
                      />
                    </DivSecao>
                  )}

                  <DivSecao>
                    <h1>Endereço</h1>
                    <InputField type="text" label="Estado:" {...register("endereco.estado")} />
                    <InputMask label="CEP" mask="99999-999" onChange={(e) => setValue("endereco.cep", e.target.value)} />
                    <InputField type="text" label="Cidade:" {...register("endereco.cidade")} />
                    <InputField type="text" label="Bairro:" {...register("endereco.bairro")} />
                    <InputField type="text" label="Rua:" {...register("endereco.rua")} />
                    <InputField type="text" label="Número:" {...register("endereco.numero")} />
                    <InputField type="text" label="Povoado:" {...register("endereco.povoado")} />
                  </DivSecao>
                </ContainerInput>

                <div className="DivBotom">
                  <Button style={{ backgroundColor: `${darkTheme.colors.secundary}` }}>Salvar</Button>
                </div>
              </FormContainer>
            </FormProvider>
          </DialogCadastro>
        )}

      </ContainerAluno>
    </>
  );
}

export default FuncionarioPage;
