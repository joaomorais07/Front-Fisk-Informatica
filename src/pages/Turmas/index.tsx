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
} from "./style";
import { BiUserPlus } from "react-icons/bi";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import InputField from "../../components/Inputs/InputField";
import SelectField from "../../components/Selects";
import { darkTheme } from "../../themes";
import { TurmaData } from "../../utils/types";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import TimeRangeInput from "../../components/Inputs/InputTime";
import TurmasList from "./ListTurma";

function TurmaPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<TurmaData>();
  const { register, handleSubmit, control, reset} = methods;

  const cadastrarAluno: SubmitHandler<TurmaData> = async (data) => {
    try {
      console.log("Dados do formulário:", data);
      const response = await api.post("/turmas", data);

      if (response.status === 201) {
        toast.success("Turma cadastrada com sucesso!");
        reset();
      } else {
        toast.error("Falha ao cadastrar a turma. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar a turma:", error);
      toast.error("Erro no cadastro. Verifique os dados e tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <ContainerAluno>
        <HeaderAluno>
          <h1>Gerenciamento de Turmas</h1>
        </HeaderAluno>

        <Actions>
          <ActionButton onClick={() => setIsDialogOpen(true)}>
            <BiUserPlus size={20} />
            <span>Criar Turma</span>
          </ActionButton>
        </Actions>

        {/* Modal de Cadastro */}
        {isDialogOpen && (
          <DialogCadastro isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Turma - Cadastro">
            <FormProvider {...methods}>
              <FormContainer onSubmit={handleSubmit(cadastrarAluno)}>
                <ContainerInput>
                  {/* Seção de Dados do Aluno */}
                  <DivSecao>
                    <h1>Dados do Turma</h1>
                    <SelectField {...register("curso", { required: true })} defaultValue="">
                      <option value="" disabled>
                        Selecione o curso
                      </option>
                      <option value="informatica">Informatica</option>
                    </SelectField>
                    <InputField type="month" label="Data Inicio:" {...register("data_inicio", { required: true })} />

                      <SelectField {...register("dia_semana", { required: true })} defaultValue="">
                      <option value="" disabled>
                        Selecione o dia
                      </option>
                      <option value="segunda">Segunda</option>
                      <option value="terca">Terça</option>
                      <option value="quarta">Quarta</option>
                      <option value="quinta">Quinta</option>
                      <option value="sexta">Sexta</option>
                      <option value="sabado">Sábado</option>
                      <option value="domingo">Domingo</option>
                
                    </SelectField>
                    <SelectField {...register("turno", { required: true })} defaultValue="">
                      <option value="" disabled>
                        Selecione o turno
                      </option>
                      <option value="matutino">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                      <option value="Noturno">Noturno</option>
                    </SelectField>
                    <TimeRangeInput name="horario" control={control} label="Horário" required />
                    <InputField type="text" label="Observação:" {...register("observacoes")} />
                  </DivSecao>
                </ContainerInput>

                <div className="DivBotom">
                  <Button style={{ backgroundColor: `${darkTheme.colors.secundary}` }}>Salvar</Button>
                </div>
              </FormContainer>
            </FormProvider>
          </DialogCadastro>
        )}

        <TurmasList />
        
      </ContainerAluno>
    </>
  );
}

export default TurmaPage;
