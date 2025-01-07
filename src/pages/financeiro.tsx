import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../components/financeiro.css";

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancialReport: React.FC = () => {
  // Dados do gráfico
  const chartData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Receitas",
        data: [12000, 15000, 18000, 17000, 19000, 20000, 22000, 21000, 25000, 24000, 26000, 28000],
        borderColor: "#00796B",
        backgroundColor: "rgba(0, 121, 107, 0.2)",
        tension: 0.4,
      },
      {
        label: "Despesas",
        data: [8000, 9000, 11000, 9500, 10000, 12000, 15000, 14000, 16000, 15000, 17000, 18000],
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Opções de configuração do gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Evolução Mensal de Receitas e Despesas",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="financial-container">
      {/* Header */}
      <header className="financial-header">
        <h1>Relatório Financeiro</h1>
        <div className="filters">
          <select>
            <option>Última Semana</option>
            <option>Último Mês</option>
            <option>Último Ano</option>
            <option>Período Personalizado</option>
          </select>
          <button className="btn-export">Exportar Relatório</button>
        </div>
      </header>

      {/* KPIs Section */}
      <section className="kpi-cards">
        <div className="kpi-card">
          <h2>Receita Total</h2>
          <p>R$ 250.000</p>
        </div>
        <div className="kpi-card">
          <h2>Despesas Totais</h2>
          <p>R$ 180.000</p>
        </div>
        <div className="kpi-card">
          <h2>Lucro Líquido</h2>
          <p>R$ 70.000</p>
        </div>
        <div className="kpi-card">
          <h2>Margem de Lucro</h2>
          <p>28%</p>
        </div>
      </section>

      {/* Graph Section */}
      <section className="graph-section">
        <h2>Evolução Mensal</h2>
        <Line data={chartData} options={chartOptions} />
      </section>

      {/* Transaction Table */}
      <section className="table-section">
        <h2>Transações Detalhadas</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/01/2025</td>
              <td>Venda de Imóvel</td>
              <td>Receita</td>
              <td>R$ 150.000</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>05/01/2025</td>
              <td>Pagamento de Fornecedor</td>
              <td>Despesa</td>
              <td>R$ 50.000</td>
              <td>Pendente</td>
            </tr>
            <tr>
              <td>10/01/2025</td>
              <td>Investimento em Marketing</td>
              <td>Despesa</td>
              <td>R$ 30.000</td>
              <td>Concluído</td>
            </tr>
            {/* Adicione mais transações conforme necessário */}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default FinancialReport;
