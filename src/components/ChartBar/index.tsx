import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

interface ChartBarProps {
  data: {
    mes: string;
    receita: number;
  }[];
}

const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
  // Cores personalizadas para as barras
  const colors = ["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF"];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        height: 300,
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          marginBottom: "1.5rem",
          textAlign: "center",
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#1e293b",
          letterSpacing: "0.025em",
        }}
      >
        RECEITA MENSAL
      </h3>

      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          barSize={30} // Barras mais finas
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false} // Remove linhas verticais
            stroke="#e2e8f0"
          />
          <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b" }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
              })
            }
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
            formatter={(value: number) => [
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
              "Receita",
            ]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Bar dataKey="receita" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
