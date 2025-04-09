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

export function SignInForm() {
  const { signIn } = useAuth();

  const cpfRef = useRef("");
  const passwordRef = useRef("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"aluno" | "responsavel">("aluno");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUserTypeChange = (type: "aluno" | "responsavel") => {
    setUserType(type);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError(null);
    setIsLoading(true);

    const error = await signIn({
      cpf: cpfRef.current,
      password: passwordRef.current,
      tipo: userType, 
    });

    setError(error);
    setIsLoading(false);
  }

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit} autoComplete="off">
        <h1>Entrar</h1>
        <p>Escola de Idiomas e Cursos Profissionalizantes!</p>

        <UserSelector>
          <UserOption
            isSelected={userType === "aluno"}
            onClick={() => handleUserTypeChange("aluno")}
          >
            Aluno <Icon name="aluno" size={20} color="white"/>
          </UserOption>
          <UserOption
            isSelected={userType === "responsavel"}
            onClick={() => handleUserTypeChange("responsavel")}
          >
            Responsável <Icon name="responsavel" size={20} />
          </UserOption>
        </UserSelector>

        <Input id="sign-in-email" label="CPF" placeholder="CPF" textRef={cpfRef} mask="cpf" />
        <DivInputPassword>
          <Input
            id="sign-in-password"
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="Senha"
            textRef={passwordRef}
          />
          <PasswordToggle onClick={handleTogglePassword}>
            {showPassword ? "🙈" : "👁️"}
          </PasswordToggle>
        </DivInputPassword>

        {error && <span className="error">{error}</span>}
        <Button id="sign-in-button" type="submit" width="100%" height="40px" fontSize="16px" isLoading={isLoading}>
          Entrar
        </Button>
        <AuthFormLink>
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
          <Link to="/recuperar-senha">Área administrativa</Link>
        </AuthFormLink>
      </AuthForm>
    </AuthFormContainer>
  );
}
