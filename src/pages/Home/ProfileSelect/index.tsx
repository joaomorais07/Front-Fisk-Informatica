import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { ContainerSelect } from "./style";

function ProfileSelect() {
  const { user, userLoading, setAlunoSelecionado } = useAuth();
  const navigate = useNavigate();

  // 1) Aguarda o usuário carregar
  useEffect(() => {
    if (userLoading) return;

    // 2) Se não tiver user ou não for responsavel ou não tiver filhos → Home
    if (!user || user.tipo.toLowerCase() !== "responsavel" || !Array.isArray((user.dados as any).filhos)) {
      navigate("/");
    }
  }, [user, userLoading, navigate]);

  // Enquanto estiver carregando, mostra um placeholder
  if (userLoading) {
    return <p>Carregando...</p>;
  }

  // Se não for responsavel com filhos, não renderiza nada
  if (!user || user.tipo.toLowerCase() !== "responsavel") {
    return null;
  }

  // Aqui sabemos que `filhos` existe e é um array
  const filhos = (user.dados as { filhos: { id: number; nome: string }[] }).filhos;

  function handleSelecionar(aluno: (typeof filhos)[0]) {
    setAlunoSelecionado(aluno);
    navigate("/");
  }

  return (
    <ContainerSelect>
      <div className="selecionar-aluno-container">
        <h2>Escolha um aluno</h2>
        <div className="alunos-grid">
          {filhos.map((aluno) => (
            <div key={aluno.id} className="aluno-card" onClick={() => handleSelecionar(aluno)}>
              <div className="avatar">{aluno.nome.charAt(0).toUpperCase()}</div>
              <p>{aluno.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </ContainerSelect>
  );
}

export default ProfileSelect;
