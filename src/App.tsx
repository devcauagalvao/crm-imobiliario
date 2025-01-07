
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ConfigContext } from './context/ConfigContext';  // Certifique-se de que está importando corretamente
import Home from './pages/Home';
import Imoveis from './pages/Imoveis';
import Clientes from './pages/Clientes';
import Leads from './pages/leads'; // Certifique-se de que o nome do arquivo é "Leads" (com L maiúsculo)
import Login from './pages/login'; // Certifique-se de que o nome do arquivo é "Login" (com L maiúsculo)
import Tarefas from './pages/tarefas'; // Certifique-se de que o nome do arquivo é "Tarefas" (com T maiúsculo)
import Suporte from './pages/suporte'; // Certifique-se de que o nome do arquivo é "Suporte" (com S maiúsculo)
import Header from './pages/Header';
import Campanhas from './pages/campanhas'; // Certifique-se de que o nome do arquivo é "Campanhas" (com C maiúsculo)
import Agenda from './pages/agenda'; // Certifique-se de que o nome do arquivo é "Agenda" (com A maiúsculo)
import Config from './pages/config'; // Certifique-se de que o nome do arquivo é "Config" (com C maiúsculo)
import Relatorio from './pages/relatorio'; // Certifique-se de que o nome do arquivo é "Relatorio" (com R maiúsculo)
import Financeiro from './pages/financeiro'; // Renomeado para "Financeiro" com F maiúsculo
import Vendas from './pages/vendas'; // Corrigido para "Vendas" com V maiúsculo
import { ConfigProvider } from './context/ConfigContext';  // Importando o Provider

const App: React.FC = () => {
  const context = useContext(ConfigContext);

  // Verifique se o contexto é undefined
  if (!context) {
    return <div>Carregando configurações...</div>; // Ou qualquer outro comportamento desejado
  }

  const { configuracoes } = context;

  const estiloGlobal = {
    fontSize: `${configuracoes.tamanhoFonte}px`,  // Aplica o tamanho da fonte globalmente
    filter:
      configuracoes.modoDaltonismo === 'protanopia'
        ? 'grayscale(50%) hue-rotate(-30deg)'
        : configuracoes.modoDaltonismo === 'deuteranopia'
        ? 'grayscale(50%) hue-rotate(30deg)'
        : configuracoes.modoDaltonismo === 'tritanopia'
        ? 'grayscale(50%) hue-rotate(180deg)'
        : 'none',  // Aplica o filtro de daltonismo globalmente
  };

  return (
    <Router>
      <div style={estiloGlobal}> {/* Aplica o filtro globalmente */}
        <RenderHeader />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/imoveis" element={<Imoveis />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/tarefas" element={<Tarefas />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/campanhas" element={<Campanhas />} />
          <Route path="/config" element={<Config />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/vendas" element={<Vendas />} />
        </Routes>
      </div>
    </Router>
  );
};

const RenderHeader: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/'; // Header não aparece na página de login

  return <>{showHeader && <Header />}</>;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <ConfigProvider>
    <App />
  </ConfigProvider>
);

