import React, { useEffect, useState } from "react";
import "../components/Home.css"; // arquivo CSS

// Defina a interface para os dados do clima
interface WeatherData {
  main: {
    temp: number;
  };
  weather?: Array<{
    description: string;
  }>;
  name: string;
}

// Função para obter dados da API de Clima
const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
  try {
    const apiKey = "SUA_CHAVE_API"; // Substitua pela sua chave da API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do clima", error);
    return null;
  }
};

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Obter dados ao carregar a página
  useEffect(() => {
    const getData = async () => {
      const weather = await fetchWeatherData("São Paulo"); // Substitua pela cidade desejada
      setWeatherData(weather);
    };
    
    getData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="filter-options">
          <select>
            <option>Última Semana</option>
            <option>Último Mês</option>
            <option>Último Trimestre</option>
          </select>
        </div>
      </header>

      {/* Clima Atual - Visível logo ao abrir */}
      <section className="weather-section">
        <div className="card">
          <h2>Clima Atual</h2>
          <div className="weather-placeholder">
            {weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
              <div>
                <p><strong>Temperatura:</strong> {weatherData.main?.temp}°C</p>
                <p><strong>Descrição:</strong> {weatherData.weather[0]?.description}</p>
                <p><strong>Localização:</strong> {weatherData.name}</p>
              </div>
            ) : (
              <p>Carregando clima...</p>
            )}
          </div>
        </div>
      </section>

      {/* Performance e Leads */}
      <section className="performance-leads">
        <div className="card">
          <h2>Performance por Imóvel</h2>
          <div className="graph-placeholder">[Gráfico de Performance por Imóvel]</div>
        </div>
        <div className="card">
          <h2>Leads em Acompanhamento</h2>
          <div className="graph-placeholder">[Gráfico de Leads]</div>
        </div>
      </section>

      {/* Resumo Geral */}
      <section className="summary-cards">
        <div className="card">
          <h2>Total de Vendas</h2>
          <p>250</p>
        </div>
        <div className="card">
          <h2>Valor Total Vendido</h2>
          <p>R$ 12.500.000</p>
        </div>
        <div className="card">
          <h2>Imóveis Vendidos</h2>
          <p>120</p>
        </div>
        <div className="card">
          <h2>Comissões Geradas</h2>
          <p>R$ 1.250.000</p>
        </div>
      </section>

      {/* Performance por Região e Categoria de Imóvel */}
      <section className="region-category">
        <div className="card">
          <h2>Performance por Região</h2>
          <div className="graph-placeholder">[Gráfico de Performance por Região]</div>
        </div>
        <div className="card">
          <h2>Vendas por Categoria de Imóvel</h2>
          <div className="graph-placeholder">[Gráfico de Vendas por Categoria]</div>
        </div>
      </section>

      {/* Leads Recentes e Clientes Recentes */}
      <section className="recent-leads-clients">
        <div className="card">
          <h2>Leads Recentes</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>João Silva</td>
                <td>j.silva@gmail.com</td>
                <td>Em negociação</td>
              </tr>
              <tr>
                <td>Maria Santos</td>
                <td>m.santos@gmail.com</td>
                <td>Interessado</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Clientes Recentes</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Imóvel</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rafael Oliveira</td>
                <td>Casa - 3 quartos</td>
                <td>10/01/2025</td>
              </tr>
              <tr>
                <td>Patricia Lima</td>
                <td>Apartamento - 2 quartos</td>
                <td>08/01/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Gráficos e Métricas adicionais */}
      <section className="additional-graphs">
        <div className="card">
          <h2>Conversões de Marketing</h2>
          <div className="graph-placeholder">[Gráfico de Conversões]</div>
        </div>
        <div className="card">
          <h2>Taxa de Satisfação do Cliente</h2>
          <div className="graph-placeholder">[Gráfico de Satisfação]</div>
        </div>
      </section>

      {/* Previsão de Vendas */}
      <section className="sales-forecast">
        <div className="card">
          <h2>Previsão de Vendas</h2>
          <div className="graph-placeholder">[Gráfico de Previsão]</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
