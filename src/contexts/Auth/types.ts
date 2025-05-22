export type SignInData = {
  cpf: string;
  password: string;
  tipo: string;
};


export type SignUpErrors = {
  password: string | undefined;
  cpf: string | undefined;
  tipo: string | undefined
};

export type TipoUsuario = "Diretor" | "Aluno" | "Responsavel" | "Professor" | "Secretario";

export interface IUserBase {
  id_usuario: number;
  cpf_usuario: string;
  tipo: TipoUsuario;
}

// Quando o user é aluno, diretor, professor, etc.
export interface IDadosSimples {
  id: number;
  nome: string;
}

// Quando o user é responsável (com múltiplos perfis)
export interface IDadosResponsavel {
  id: number;
  nome: string;
  filhos: IDadosSimples[]; // lista de alunos associados ao responsável
}

// Union para aceitar os dois
export type DadosUsuario = IDadosSimples | IDadosResponsavel;

export interface IUser extends IUserBase {
  dados: DadosUsuario;
}