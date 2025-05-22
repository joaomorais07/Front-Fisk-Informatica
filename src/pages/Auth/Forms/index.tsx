// src/pages/Auth/SignInForms.tsx

import { Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormLink,
  DivInputPassword,
  PasswordToggle,
  UserSelector,
  UserOption,
} from "./style";
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/Auth";
import Input from "../../../components/Inputs/Input";
import Icon from "../../../components/Icons";

type FormType = "aluno" | "responsavel" | "funcionario";

/**
 * Formulário de login para Aluno ou Responsável
 */
export function SignInForm() {
  const { signIn } = useAuth();

  // refs para aproveitar seu Input sem modificar
  const cpfRef = useRef("");
  const passwordRef = useRef("");

  // controle de estado apenas para UI
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<FormType>("aluno");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword((v) => !v);

  const selectType = (type: FormType) => {
    setError(null);
    setUserType(type);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const err = await signIn({
      cpf: cpfRef.current,
      password: passwordRef.current,
      tipo: userType,
    });

    setError(err);
    setIsLoading(false);
  };

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit} autoComplete="off">
        <h1>Entrar</h1>
        <p>Escola de Idiomas e Cursos Profissionalizantes!</p>

        <UserSelector>
          <UserOption
            type="button"
            isSelected={userType === "aluno"}
            onClick={() => selectType("aluno")}
          >
            Aluno <Icon name="Aluno" size={20} color="#cc00ff" />
          </UserOption>
          <UserOption
            type="button"
            isSelected={userType === "responsavel"}
            onClick={() => selectType("responsavel")}
          >
            Responsável <Icon name="Responsavel" size={20} color="#cc00ff" />
          </UserOption>
        </UserSelector>

        <Input
          id="sign-in-cpf"
          label="CPF"
          placeholder="Digite seu CPF"
          textRef={cpfRef}
          mask="cpf"
        />

        <DivInputPassword>
          <Input
            id="sign-in-password"
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="Digite sua senha"
            textRef={passwordRef}
          />
          <PasswordToggle onClick={togglePassword}>
            {showPassword ? "🙈" : "👁️"}
          </PasswordToggle>
        </DivInputPassword>

        {error && <span className="error">{error}</span>}

        <Button
          id="sign-in-button"
          type="submit"
          width="100%"
          height="40px"
          fontSize="16px"
          isLoading={isLoading}
        >
          Entrar
        </Button>

        <AuthFormLink>
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
          <Link to="/login/administracao">Área administrativa</Link>
        </AuthFormLink>
      </AuthForm>
    </AuthFormContainer>
  );
}

/**
 * Formulário de login para Administração/Funcionário
 */
export function SignInFormAdm() {
  const { signIn } = useAuth();

  const cpfRef = useRef("");
  const passwordRef = useRef("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword((v) => !v);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const err = await signIn({
      cpf: cpfRef.current,
      password: passwordRef.current,
      tipo: "funcionario",
    });

    setError(err);
    setIsLoading(false);
  };

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit} autoComplete="off">
        <h1>Entrar - Administração</h1>
        <p>Área administrativa da Escola</p>

        <UserSelector>
          <div className="DivAdm">
            Administração <Icon name="Aluno" size={20} color="#cc00ff"/>
          </div>
        </UserSelector>

        <Input
          id="sign-in-cpf-adm"
          label="CPF"
          placeholder="Digite seu CPF"
          textRef={cpfRef}
          mask="cpf"
        />

        <DivInputPassword>
          <Input
            id="sign-in-password-adm"
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="Digite sua senha"
            textRef={passwordRef}
          />
          <PasswordToggle onClick={togglePassword}>
            {showPassword ? "🙈" : "👁️"}
          </PasswordToggle>
        </DivInputPassword>

        {error && <span className="error">{error}</span>}

        <Button
          id="sign-in-button-adm"
          type="submit"
          width="100%"
          height="40px"
          fontSize="16px"
          isLoading={isLoading}
        >
          Entrar
        </Button>

        <AuthFormLink>
          <Link to="/login">Área do Usuário</Link>
        </AuthFormLink>
      </AuthForm>
    </AuthFormContainer>
  );
}
