import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { createContext, useContext, ReactNode, useMemo, useEffect, useState } from "react";
import { validateCpf } from "../../utils/validators";
import { IDadosSimples, IUser, SignInData } from "./types";

interface AuthContextType {
  user: IUser | null;
  userLoading: boolean;
  alunoSelecionado: IDadosSimples | null;
  setAlunoSelecionado: (aluno: IDadosSimples | null) => void;
  signIn: (data: SignInData) => Promise<string | null>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [alunoSelecionado, _setAlunoSelecionado] = useState<IDadosSimples | null>(() => {
    const stored = localStorage.getItem("alunoSelecionado");
    return stored ? JSON.parse(stored) : null;
  });

  const setAlunoSelecionado = (aluno: IDadosSimples | null) => {
    _setAlunoSelecionado(aluno);
    if (aluno) {
      localStorage.setItem("alunoSelecionado", JSON.stringify(aluno));
    } else {
      localStorage.removeItem("alunoSelecionado");
    }
  };

  function clearAllUserImages() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('imagemUrl-')) {
        localStorage.removeItem(key);
      }
  });
}

  async function signIn(data: SignInData) {
    const { cpf, password, tipo } = data;
    const cpfError = validateCpf(cpf);
    if (cpfError) {
      setUser(null);
      return "Usuário ou senha inválidos";
    }

    try {
      const response = await api.post("/usuarios/login", {
        cpf_usuario: cpf,
        senha_usuario: password,
        tipo,
      });

      const { user, token } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
      setUser(user);

      if (tipo.toLowerCase() === "responsavel") {
        navigate("/selecionar-aluno");
      } else {
        navigate("/");
      }

      return null;
    } catch {
      setUser(null);
      return "Usuário ou senha inválidos";
    }
  }

  function signOut() {
    clearAllUserImages();
    setUser(null);
    setAlunoSelecionado(null);
    api.defaults.headers.authorization = "";
    localStorage.removeItem("token");
    localStorage.removeItem("alunoSelecionado");
    navigate("/login");
  }

  async function verifyStoredToken() {
    setUserLoading(true);
    const token = localStorage.getItem("token");
    
    if (!token) {
      setUserLoading(false);
      navigate("/login");
      return;
    }

    api.defaults.headers.authorization = `Bearer ${token}`;
    
    try {
      const response = await api.get("/usuarios");
      if (response.status === 200) {
        setUser(response.data);
        
        if (response.data.tipo.toLowerCase() === "responsavel" && !alunoSelecionado) {
          navigate("/selecionar-aluno");
        }
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setUserLoading(false);
    }
  }

  useEffect(() => {
    verifyStoredToken();
  }, []);

  const values = useMemo(() => ({
    user,
    userLoading,
    alunoSelecionado,
    setAlunoSelecionado,
    signIn,
    signOut,
  }), [user, userLoading, alunoSelecionado]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}