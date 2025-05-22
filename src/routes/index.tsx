import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/Auth";
import AlunosPage from "../pages/Alunos";
import FuncionarioPage from "../pages/Funcionarios";
import { useAuth } from "../contexts/Auth";
import TurmaPage from "../pages/Turmas";
import ProfileSelect from "../pages/Home/ProfileSelect";
import HomePage from "../pages/Home";

export function MyRoutes() {
  const { user } = useAuth();

  const routes = [
    {
      path: "/",
      element: <PrivateRoute element={<HomePage />} forUsers={["diretor", "professor", "secretario", "aluno", "responsavel"]} />,
    },
    {
      path: "/login",
      element: user ? (
        user.tipo === "Responsavel" ? (
          <Navigate to="/selecionar-aluno" />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <AuthPage page="sign-in" />
      ),
    },

    {
      path: "/selecionar-aluno",
      element: <ProfileSelect /> ,
    },

    {
      path: "/aluno",
      element: <AlunosPage />,
    },
    {
      path: "/funcionario",
      element: <PrivateRoute element={<FuncionarioPage />} forUsers={["diretor", "secretario"]} />,
    },
    {
      path: "/turma",
      element: <PrivateRoute element={<TurmaPage />} forUsers={["diretor", "secretario"]} />,
    },
    {
      path: "/login/administracao",
      element: user ? <Navigate to="/" /> : <AuthPage page="sign-in_adm" />,
    },
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

type PrivateRouteProps = {
  element: JSX.Element;
  forUsers: string[];
};

function PrivateRoute({ element, forUsers }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const tipo = user?.tipo?.toLowerCase();

  if (tipo && forUsers.includes(tipo)) {
    return element;
  }

  return <Navigate to="/" />;
}
