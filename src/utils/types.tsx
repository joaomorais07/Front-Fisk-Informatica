export interface SelectFieldProps {
  value?: string | number | readonly string[];
  onValueChange?: (value: string) => void;
  name?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface AlunoData {
  id_aluno: string | null
  nome_aluno: string;
  telefone_aluno: string | null;
  cpf_aluno: string | null;
  sexo: string;
  data_nascimento: string;
  tem_responsavel: boolean;
  status_matricula: string;
  id_responsavel: string | null;
  id_endereco: string;

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
