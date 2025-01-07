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
import "../components/vendas.css";

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

const CRMReport: React.FC = () => {
  // Dados do gráfico de vendas
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
        label: "Vendas",
        data: [8, 12, 15, 10, 20, 25, 30, 18, 35, 40, 45, 50],
        borderColor: "#00796B",
        backgroundColor: "rgba(0, 121, 107, 0.2)",
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
        text: "Vendas por Período (Mensal)",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="crm-container">
      {/* Header */}
      <header className="crm-header">
        <h1>Relatório de Vendas</h1>
        <div className="crm-filters">
          <select>
            <option>Última Semana</option>
            <option>Último Mês</option>
            <option>Último Ano</option>
          </select>
          <button className="crm-btn-export">Exportar Relatório</button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="crm-summary-cards">
        <div className="crm-card">
          <h2>Total de Vendas</h2>
          <p>45</p>
        </div>
        <div className="crm-card">
          <h2>Valor Total Vendido</h2>
          <p>R$ 1.250.000</p>
        </div>
        <div className="crm-card">
          <h2>Comissões Geradas</h2>
          <p>R$ 125.000</p>
        </div>
        <div className="crm-card">
          <h2>Meta Alcançada</h2>
          <p>90%</p>
        </div>
      </section>

      {/* Graph Section */}
      <section className="crm-graph-section">
        <h2>Vendas por Período</h2>
        <Line data={chartData} options={chartOptions} />
      </section>

      {/* Detailed Table */}
      <section className="crm-table-section">
        <h2>Detalhes das Vendas</h2>
        <table className="crm-sales-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Corretor</th>
              <th>Imóvel</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João Silva</td>
              <td>Ana Oliveira</td>
              <td>Apartamento</td>
              <td>R$ 350.000</td>
              <td>01/01/2025</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Maria Santos</td>
              <td>Lucas Pereira</td>
              <td>Casa</td>
              <td>R$ 500.000</td>
              <td>15/12/2024</td>
              <td>Pendente</td>
            </tr>
            {/* Adicione mais linhas conforme necessário */}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CRMReport;
