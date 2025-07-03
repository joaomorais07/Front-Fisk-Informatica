import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Container, HeaderMateria, Form, Input, Button, MateriaList, MateriaCard, Option } from "./styles";
import { api } from "../../services/api";
import { SlOptionsVertical } from "react-icons/sl";

interface IMateria {
  id_materia: number;
  nome: string;
}

const MateriaPage: React.FC = () => {
  const [materias, setMaterias] = useState<IMateria[]>([]);
  const [nome, setNome] = useState("");

  // Buscar todas as matérias ao carregar
  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const response = await api.get("/materia"); // Atualize a rota conforme seu backend
      setMaterias(response.data);
    } catch (error) {
      console.error("Erro ao buscar matérias", error);
    }
  };

  const handleCreateMateria = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/materia", { nome });
      setMaterias([...materias, response.data]); // Atualiza a lista com a nova matéria
      setNome(""); // Limpa o campo
    } catch (error) {
      console.error("Erro ao criar matéria", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <HeaderMateria>Registro de Matérias</HeaderMateria>

        <Form onSubmit={handleCreateMateria}>
          <Input
            type="text"
            placeholder="Digite o nome da matéria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <Button type="submit">Cadastrar Matéria</Button>
        </Form>

        <MateriaList>
          {materias.map((materia) => (
            <MateriaCard key={materia.id_materia}>
              {materia.nome}
              <Option>
                <SlOptionsVertical />
              </Option>
            </MateriaCard>
          ))}
        </MateriaList>
      </Container>
    </>
  );
};

export default MateriaPage;
