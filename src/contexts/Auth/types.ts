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

export interface IUser {
  id_usuario: number;
  cpf_usuario: string;
  tipo: string
}
