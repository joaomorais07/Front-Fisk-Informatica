import {  Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
// import { useAuth } from "../contexts/Auth";
import AlunosPage from "../pages/Alunos";
import FuncionarioPage from "../pages/Funcionarios";

export function MyRoutes() {
  // const location = useLocation();

  const routes = [
    {
      path: "/",
      element: <HomePage />, 
    },
    {
      path: "/login",
      element: <AuthPage page="sign-in" />,
    },
    {
      path: "/aluno",
      element: <AlunosPage />,
    },
    {
      path: "/funcionario",
      element: <FuncionarioPage />,
    },
    {
      path: "/cadastro",
      element: <AuthPage page="sign-up" />,
    },
   
  ];

  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

// type PrivateRouteProps = {
//   element: JSX.Element;
//   forUsers: string[];
// };

// function PrivateRoute({ element, forUsers }: PrivateRouteProps) {
//   const { user } = useAuth();

//   // Se o usuário não estiver logado, redireciona para a página de eventos
//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   const isAdminRoute = forUsers.includes("admin");

//   // Se o usuário é administrador, permite o acesso a rotas admin
//   if (isAdminRoute && user.administrador) {
//     return element;
//   }

//   // Se a rota não é admin e o usuário não é administrador, permite o acesso
//   if (!isAdminRoute && !user.administrador) {
//     return element;
//   }

//   // Se a rota não é admin e o usuário é administrador, permite o acesso
//   if (!isAdminRoute && user.administrador) {
//     return element;
//   }

//   // Usuário não autorizado tenta acessar uma rota restrita, redireciona para eventos
//   return <Navigate to="/" />;
// }