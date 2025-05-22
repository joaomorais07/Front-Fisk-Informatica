import { api } from "../services/api";

interface FetchUserDataParams {
  tipo: string | undefined;
  id: string | number | undefined;
  alunoSelecionadoId?: string | number | null;
}

interface FetchedUser {
  data: any;
  imagemUrl: string;
}

export async function fetchUserData({ tipo, id, alunoSelecionadoId }: FetchUserDataParams): Promise<FetchedUser | null> {
  if (!tipo || !id) return null;

  try {
    let response;
    let imagemUrl = "/Front-Fisk-Informatica/assets/profile/default.png";

    switch (tipo.toLowerCase()) {
      case "aluno":
        response = await api.get(`alunos/${id}`);
        imagemUrl = response.data?.foto_aluno || imagemUrl;
        break;

      case "responsavel":
        if (!alunoSelecionadoId) return null;
        response = await api.get(`alunos/${alunoSelecionadoId}`);
        imagemUrl = response.data?.foto_aluno || imagemUrl;
        break;

      case "diretor":
        response = await api.get(`diretor/${id}`);
        imagemUrl = response.data?.foto_diretor || imagemUrl;
        break;

      case "professor":
        response = await api.get(`professor/${id}`);
        imagemUrl = response.data?.foto_professor || imagemUrl;
        break;

      case "secretario":
        response = await api.get(`secretario/${id}`);
        imagemUrl = response.data?.foto_secretario || imagemUrl;
        break;

      default:
        return null;
    }

    return {
      data: response.data,
      imagemUrl,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
}