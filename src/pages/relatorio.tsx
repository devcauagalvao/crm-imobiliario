import React, { useState } from 'react';
import '../components/relatorio.css';
import { jsPDF } from 'jspdf';

// Importando o logo diretamente do arquivo
import logo from '../assets/logoglv.png';

const ReportsPage: React.FC = () => {
  const [date, setDate] = useState('');
  const [property, setProperty] = useState('');
  const [agent, setAgent] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();

    // Usando o logo importado diretamente
    doc.addImage(logo, 'PNG', 14, 10, 30, 30);  // Logo da empresa
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Desempenho", 60, 20);
    
    // Subtítulo
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Resumo das informações e desempenho do imóvel", 60, 30);

    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(14, 35, 200, 35);

    // Descrição do Relatório
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Este relatório fornece um resumo do desempenho recente.", 14, 45);
    doc.text("As informações a seguir são geradas com base nos dados preenchidos:", 14, 55);

    // Adicionando a descrição no PDF
    if (description) {
      doc.text("Descrição: " + description, 14, 65);  // Descrição fornecida pelo usuário
    }

    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(14, 75, 200, 75);

    // Informações detalhadas
    doc.setTextColor(0);  // Texto preto para as informações principais
    doc.text(`Data: ${date || 'N/A'}`, 14, 85);
    doc.text(`Imóvel: ${property || 'N/A'}`, 14, 95);
    doc.text(`Corretor: ${agent || 'N/A'}`, 14, 105);
    doc.text(`Valor: ${value || 'N/A'}`, 14, 115);

    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(14, 120, 200, 120);

    // Rodapé (informações adicionais)
    doc.setFontSize(10);
    doc.setTextColor(150); // Cor cinza para o rodapé
    doc.text("Gerado por CRM Imobiliário - Sistema de Gerenciamento de Imóveis", 14, 270);

    // Gerar o PDF
    doc.save("relatorio.pdf");
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Relatórios</h1>
        <p className="header-subtitle">Visualize as estatísticas e os relatórios de desempenho.</p>
      </header>

      <section className="filters">
        <h2 className="filters-title">Preencha os Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="date" className="block text-gray-600 mb-2">Data</label>
            <input
              type="date"
              id="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="property" className="block text-gray-600 mb-2">Imóvel</label>
            <input
              type="text"
              id="property"
              className="input"
              placeholder="Digite o nome do imóvel"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="agent" className="block text-gray-600 mb-2">Nome do Corretor</label>
            <input
              type="text"
              id="agent"
              className="input"
              placeholder="Digite o nome do corretor"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="value" className="block text-gray-600 mb-2">Valor do Imóvel</label>
            <input
              type="text"
              id="value"
              className="input"
              placeholder="Digite o valor do imóvel"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="description" className="block text-gray-600 mb-2">Descrição</label>
            <textarea
              id="description"
              className="input"
              placeholder="Digite a descrição do relatório"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <button
          onClick={generatePDF}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600"
        >
          Gerar PDF
        </button>
      </section>

      <section className="filters">
        <h2 className="filters-title">Resultados</h2>
        <div className="overflow-x-auto mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Imóvel</th>
                <th>Corretor</th>
                <th>Data</th>
                <th className="text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{property || "N/A"}</td>
                <td>{agent || "N/A"}</td>
                <td>{date || "N/A"}</td>
                <td className="text-right">{value || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
