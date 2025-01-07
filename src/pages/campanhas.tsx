import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import '../components/campanhas.css'; // Importando o arquivo CSS

// Registrar os componentes necessários para o gráfico
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Interface para os dados da campanha
interface CampaignData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Buscar dados da campanha da API (substitua com a sua API real)
  useEffect(() => {
    axios
      .get("/api/campaigns")
      .then((response) => {
        setCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados das campanhas", error);
        setLoading(false);
      });
  }, []);

  // Preparar dados para o gráfico
  const chartData = {
    labels: campaigns.map((campaign) => campaign.date),
    datasets: [
      {
        label: "Impressions",
        data: campaigns.map((campaign) => campaign.impressions),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Clicks",
        data: campaigns.map((campaign) => campaign.clicks),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Conversions",
        data: campaigns.map((campaign) => campaign.conversions),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="campaign-container">
      <h1 className="campaign-title">Campaign Management</h1>
      {loading ? (
        <div className="loading">Loading campaigns...</div>
      ) : (
        <div>
          {/* Gráfico de desempenho das campanhas */}
          <div className="mb-6">
            <h2 className="campaign-performance-title">Campaign Performance</h2>
            <Line data={chartData} />
          </div>

          {/* Informações resumidas sobre as campanhas */}
          <div className="campaign-summary-grid">
            <div className="campaign-summary-card">
              <h3>Total Impressions</h3>
              <p>{campaigns.reduce((acc, campaign) => acc + campaign.impressions, 0)}</p>
            </div>
            <div className="campaign-summary-card">
              <h3>Total Clicks</h3>
              <p>{campaigns.reduce((acc, campaign) => acc + campaign.clicks, 0)}</p>
            </div>
            <div className="campaign-summary-card">
              <h3>Total Conversions</h3>
              <p>{campaigns.reduce((acc, campaign) => acc + campaign.conversions, 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
