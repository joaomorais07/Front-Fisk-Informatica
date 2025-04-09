import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { createContext, useContext, ReactNode, useMemo, useEffect, useState } from "react";
import { validateCpf, validateEmail, validateName, validatePassword } from "../../utils/validators";
import { IUser, SignInData, SignUpErrors } from "./types";

interface AuthContextType {
  user: IUser | undefined;
  userLoading: boolean;
  signIn: (data: SignInData) => Promise<string | null>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  async function signIn(data: SignInData) {
    const { cpf, password, tipo} = data;
    const cpfError = validateCpf(cpf);

    if (cpfError) {
      return "Usuário ou senha inválidos";
    }

    try {
      const response = await api.post("/usuarios/login", {
        cpf_usuario: cpf,
        senha_usuario: password,
        tipo: tipo,
      });

      const { user, token } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
      setUser(user);

      navigate("/"); // Navega para a página principal após login
      return null;
    } catch (error) {
      return "Usuário ou senha inválidos";
    }
  }

  function signOut() {
    setUser(undefined);
    api.defaults.headers.authorization = null;
    localStorage.removeItem("token");
    navigate("/login"); // Navega para a página de login após logout
  }


  async function verifyStoredToken() {
    setUserLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      try {
        const response = await api.get("/usuarios");
        setUserLoading(false);

        if (response.status === 200) {
          setUser(response.data);
          return; // Se o token for válido, apenas retorne
        }
      } catch (error) {
        localStorage.removeItem("token");
        setUserLoading(false);
        return;
      }
    } else {
      setUserLoading(false);
      return;
    }
  }


  useEffect(() => {
    verifyStoredToken();
  }, []);

  const values = {
    userLoading,
    user,
    signIn,
    signOut,
  };

  const contextValue = useMemo(() => values, [values]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
