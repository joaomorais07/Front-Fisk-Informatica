export interface SelectFieldProps {
  value?: string | number | readonly string[];
  onValueChange?: (value: string) => void;
  name?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface AlunoData {
  id_aluno: string | null;
  nome_aluno: string;
  telefone_aluno: string | null;
  cpf_aluno: string | null;
  sexo: string;
  data_nascimento: string;
  tem_responsavel: boolean;
  status_matricula: string;
  id_responsavel: string | null;
  id_endereco: string;
  foto_aluno: string | null;

  responsavel: {
    id_responsavel: string | null;
    nome_responsavel: string | null;
    cpf_responsavel: string | null;
    telefone_responsavel: string | null;
  };

  endereco: EderecoData;
}

export interface EderecoData {
  estado: string;
  cep: string;
  cidade: string;
  bairro: string | null;
  rua: string | null;
  povoado: string | null;
  numero: string | null;
}

export interface TurmaData {
  id_turma: string | null;
  nome_turma: string | null;
  curso: string;
  data_inicio: string;
  dia_semana: string;
  turno: string;
  total_alunos: number;
  horario: string | null;
  status: string;
  observacao: string | null;
}

export interface DiretoData {
  id_diretor: string;
  nome_diretor: string;
  cpf_diretor: string;
  telefone_diretor: string | null;
  foto_diretor: string | null;
  data_nascimento: string;
}
