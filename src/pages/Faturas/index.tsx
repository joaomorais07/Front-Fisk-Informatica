import { useState } from "react";
import Header from "../../components/Header";
import AlunosTable from "./AlunosTable";
import ClientesTable from "./ClientesTable";
import ChartBar from "../../components/ChartBar";
import ChartPie from "../../components/ChartPie";
import { ListaContainer, TabSwitcherContainer, TabButton, MetricsContainer, MetricCard, ChartsContainer } from "./styles";

function FaturasPage() {
  const [activeTab, setActiveTab] = useState<"clientes" | "alunos">("clientes");
  const [busca, setBusca] = useState("");

  const dadosFaturamento = [
    { mes: "Jan", receita: 2000 },
    { mes: "Fev", receita: 3500 },
    { mes: "Mar", receita: 1800 },
    { mes: "Abr", receita: 4200 },
    { mes: "Mai", receita: 3900 },
    { mes: "Jun", receita: 3200 },
  ];

  const dadosPizza = [
    { name: "Pago", value: 60 },
    { name: "Pendente", value: 25 },
    { name: "Atrasado", value: 15 },
  ];

  return (
    <>
      <Header />
      <ListaContainer>
        {/* Seção de Métricas */}

        <MetricsContainer>
          {/* Container de Métricas */}
          <div>
            <MetricCard color="#2ecc71">
              <strong>Receita no Mês</strong>
              <p>R$ 20.000</p>
            </MetricCard>
            <MetricCard color="#3498db">
              <strong>Previsto</strong>
              <p>R$ 25.000</p>
            </MetricCard>
            <MetricCard color="#e74c3c">
              <strong>Inadimplentes</strong>
              <p>15 alunos</p>
            </MetricCard>
            <MetricCard color="#f39c12">
              <strong>Pagamentos Parciais</strong>
              <p>8 alunos</p>
            </MetricCard>
          </div>

          {/* Container de Gráficos */}
          <ChartsContainer>
            <ChartBar data={dadosFaturamento} />
          </ChartsContainer>
        </MetricsContainer>

        {/* Seletor de Abas */}
        <TabSwitcherContainer>
          <TabButton active={activeTab === "clientes"} onClick={() => setActiveTab("clientes")}>
            Clientes
          </TabButton>
          <TabButton active={activeTab === "alunos"} onClick={() => setActiveTab("alunos")}>
            Alunos
          </TabButton>
        </TabSwitcherContainer>

        {/* Renderização condicional das tabelas */}
        {activeTab === "alunos" ? (
          <AlunosTable busca={busca} setBusca={setBusca} />
        ) : (
          <ClientesTable busca={busca} setBusca={setBusca} />
        )}
      </ListaContainer>
    </>
  );
}

export default FaturasPage;
