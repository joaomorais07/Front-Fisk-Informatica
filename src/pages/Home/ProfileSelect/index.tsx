import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { ContainerSelect } from "./style";
import GeneralLoading from "../../../components/GeneralLoading";

function ProfileSelect() {
  const { user, userLoading, setAlunoSelecionado } = useAuth();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (userLoading) return;

    if (!user || user.tipo.toLowerCase() !== "responsavel" || !Array.isArray((user.dados as any).filhos)) {
      navigate("/");
    }
  }, [user, userLoading, navigate]);

  function handleSelecionar(aluno: any) {
    setIsAnimating(true);
    setTimeout(() => {
      setAlunoSelecionado(aluno);
      navigate("/", { replace: true });
    }, 300);
  }

  if (userLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <GeneralLoading />
      </div>
    );
  }

  if (!user || user.tipo.toLowerCase() !== "responsavel") {
    return null;
  }

  const filhos = (user.dados as { filhos: { id: number; nome: string }[] }).filhos;

  return (
    <ContainerSelect>
      <div className="content-wrapper">
        <div className="header">
          <img 
            src="/Front-Fisk-Informatica/assets/images/Full_Logo.png" 
            alt="Logo" 
            className="logo"
          />
        </div>

        <div className={`selecionar-aluno-container ${isAnimating ? "fade-out" : ""}`}>
          <div className="header-content">
            <h1>Selecione o perfil</h1>
          </div>

          <div className="alunos-grid">
            {filhos.map((aluno) => (
              <div key={aluno.id} className="aluno-card" onClick={() => handleSelecionar(aluno)}>
                <div className="avatar" style={{ backgroundColor: getRandomColor() }}>
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
                <h3>{aluno.nome}</h3>
                <span className="enter-hint">Clique para entrar</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContainerSelect>
  );
}

function getRandomColor() {
  const colors = ["#5b92e5", "#6bbd68", "#e55b5b", "#e5a95b", "#9b5be5", "#5be5c9", "#e55ba9", "#5b92e5"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default ProfileSelect;