export interface SelectFieldProps {
  value?: string | number | readonly string[];
  onValueChange?: (value: string) => void;
  name?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface AlunoData {
  id_aluno: number | null;
  nome_aluno: string;
  telefone_aluno: string | null;
  cpf_aluno: string | null;
  sexo: string;
  data_nascimento: string;
  tem_responsavel: boolean;
  status_matricula: string;
  id_responsavel: string | null;
  id_endereco: string;
  id_turma: string | null;
  id_cliente: string | null;
  foto_aluno: string | null;

  responsavel: {
    id_responsavel: string | null;
    nome_responsavel: string | null;
    cpf_responsavel: string | null;
    telefone_responsavel: string | null;
  };

  curso: [
    {
      nome_curso: string | null;
      progresso_curso: number | null;
    }
  ];

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
  nome_turma: string;
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


export interface IParcela {
  id: number;
  valor: number;
  vencimento: string; // formato "YYYY-MM-DD"
  status: string;
  link_pagamento?: string | null;
  pix_copia_cola?: string | null;
  pix_qr_base64?: string | null;
  url_fatura?: string | null;
  url_boleto_pdf?: string | null;
  parcela_numero?: number | null;
}

export interface IAssinatura {
  id: number;
  nome_plano: string;
  data_inicio: string; // formato "YYYY-MM-DD"
  total_parcelas: number;
  parcelas: IParcela[];
}

export interface IClienteData {
  id_cliente: number;
  id_aluno: number;
  nome: string;
  cpf: string;
  data_nascimento: string; // formato "YYYY-MM-DD"
  assinaturas?: IAssinatura[];
}