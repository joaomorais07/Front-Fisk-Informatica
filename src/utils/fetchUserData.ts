import { api } from "../services/api";

interface FetchUserDataParams {
  tipo: string;
  id: string | number;
  alunoSelecionadoId?: string | number | null;
}

interface FetchedUser {
  imagemUrl: string;
  isCached?: boolean;
}

// Cache em memória para evitar múltiplas requisições simultâneas
const pendingRequests: Record<string, boolean> = {};

export async function fetchUserData({ tipo, id, alunoSelecionadoId }: FetchUserDataParams): Promise<FetchedUser | null> {
  if (!tipo || !id) return null;

  const key = `${tipo.toLowerCase()}-${id}`;
  const imageCacheKey = `imagemUrl-${key}`;

  // 1. Verifica se temos dados em cache
  const cachedImage = localStorage.getItem(imageCacheKey);

  // 2. Retorna imediatamente os dados em cache se existirem
  if (cachedImage) {
    // Dispara a atualização em segundo plano se não estiver em andamento
    if (!pendingRequests[key]) {
      pendingRequests[key] = true;
      updateUserDataInBackground({ tipo, id, alunoSelecionadoId }).finally(() => {
        delete pendingRequests[key];
      });
    }

    return {
      imagemUrl: cachedImage,
      isCached: true,
    };
  }

  // 3. Se não houver cache, faz a requisição completa
  return await updateUserDataInBackground({ tipo, id, alunoSelecionadoId });
}

async function updateUserDataInBackground(params: FetchUserDataParams): Promise<FetchedUser | null> {
  const { tipo, id, alunoSelecionadoId } = params;
  const key = `${tipo.toLowerCase()}-${id}`;
  const imageCacheKey = `imagemUrl-${key}`;

  try {
    let response;
    let defaultImage = "/Front-Fisk-Informatica/assets/profile/default.png";
    let imagemUrl = defaultImage;

    // Faz a requisição conforme o tipo de usuário
    switch (tipo.toLowerCase()) {
      case "aluno":
        response = await api.get(`alunos/${id}`);
        imagemUrl = response.data?.foto_aluno || defaultImage;
        break;

      case "responsavel":
        if (!alunoSelecionadoId) return null;
        response = await api.get(`alunos/${alunoSelecionadoId}`);
        imagemUrl = response.data?.foto_aluno || defaultImage;
        break;

      case "diretor":
        response = await api.get(`diretor/${id}`);
        imagemUrl = response.data?.foto_diretor || defaultImage;
        break;

      case "professor":
        response = await api.get(`professor/${id}`);
        imagemUrl = response.data?.foto_professor || defaultImage;
        break;

      case "secretario":
        response = await api.get(`secretario/${id}`);
        imagemUrl = response.data?.foto_secretario || defaultImage;
        break;

      default:
        return null;
    }

    // Atualiza o cache
    if (response?.data) {
      localStorage.setItem(imageCacheKey, imagemUrl);
    }

    return {
      imagemUrl,
      isCached: false,
    };
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error);

    // Se falhar, tenta retornar o cache se existir
    const cachedImage = localStorage.getItem(imageCacheKey);
    if (cachedImage) {
      return {
        imagemUrl: cachedImage,
        isCached: true,
      };
    }

    return null;
  }
}

// Função para limpar o cache específico
export function clearUserCache(tipo: string, id: string | number) {
  const key = `${tipo.toLowerCase()}-${id}`;
  localStorage.removeItem(`imagemUrl-${key}`);
}
