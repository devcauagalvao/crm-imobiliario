import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChartBar,
  FaDollarSign,
  FaEnvelope,
  FaCog,
  FaTasks,
  FaTools,
  FaRegFileAlt,
  FaClipboardList,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import { List, ListItemButton, ListItemText, Divider, Typography } from '@mui/material';
import '../components/header.css'; // Seu arquivo de estilos

const Sidebar: React.FC = () => {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Função de logout
  const handleLogout = () => {
    // Remove o token ou qualquer dado de autenticação
    localStorage.removeItem('authToken');  // Exemplo de remoção do token

    // Redireciona para a tela de login
    navigate('/src/pages/login.tsx');
  };

  return (
    <div className="sidebar">
      {/* Título da Sidebar com design do logo */}
      <div className="sidebar-title-container">
        <span className="glv-informatica-text">GLV</span>
        <span className="informatica-text">Informática</span>
      </div>
      <Divider className="sidebar-divider" />

      {/* Navegação principal */}
      <nav>
        <List>
          <ListItemButton component={Link} to="/home" className="menu-item">
            <FaHome className="menu-icon" />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={Link} to="/leads" className="menu-item">
            <FaClipboardList className="menu-icon" />
            <ListItemText primary="Leads" />
          </ListItemButton>
          <ListItemButton component={Link} to="/clientes" className="menu-item">
            <FaUsers className="menu-icon" />
            <ListItemText primary="Clientes" />
          </ListItemButton>
          <ListItemButton component={Link} to="/imoveis" className="menu-item">
            <FaBuilding className="menu-icon" />
            <ListItemText primary="Imóveis" />
          </ListItemButton>
          <ListItemButton component={Link} to="/agenda" className="menu-item">
            <FaTasks className="menu-icon" />
            <ListItemText primary="Tarefas" />
          </ListItemButton>
          <ListItemButton component={Link} to="/tarefas" className="menu-item">
            <FaCalendarAlt className="menu-icon" />
            <ListItemText primary="Agenda" />
          </ListItemButton>
        </List>
      </nav>

      {/* Seção de Relatórios */}
      <Divider className="sidebar-divider" />
      <Typography variant="subtitle1" className="sidebar-subtitle" style={{ paddingTop: 2}}>
        Relatórios
      </Typography>
      <List style={{ paddingBottom: 10}}>
        <ListItemButton component={Link} to="/vendas" className="menu-item">
          <FaChartBar className="menu-icon" />
          <ListItemText primary="Relatório de Vendas" />
        </ListItemButton>
        <ListItemButton component={Link} to="/financeiro" className="menu-item">
          <FaDollarSign className="menu-icon" />
          <ListItemText primary="Relatório Financeiro" />
        </ListItemButton>
        <ListItemButton component={Link} to="/relatorio" className="menu-item">
          <FaRegFileAlt className="menu-icon" />
          <ListItemText primary="Relatório de Atividades" />
        </ListItemButton>
      </List>

      {/* Seção de Configurações */}
      <Divider className="sidebar-divider" />
      <Typography variant="subtitle1" className="sidebar-subtitle" style={{ paddingTop: 2}}>
        Configurações
      </Typography>
      <List style={{ paddingBottom: 10}}>
        <ListItemButton component={Link} to="/campanhas" className="menu-item">
          <FaEnvelope className="menu-icon" />
          <ListItemText primary="Campanhas de Marketing" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Config" className="menu-item">
          <FaCog className="menu-icon" />
          <ListItemText primary="Configurações Gerais" />
        </ListItemButton>
        <ListItemButton component={Link} to="/suporte" className="menu-item">
          <FaTools className="menu-icon" />
          <ListItemText primary="Ajuda e Suporte" />
        </ListItemButton>
      </List>

      {/* Botão de Logout */}
      <Divider className="sidebar-divider" />
      <List>
        <ListItemButton onClick={handleLogout} className="menu-item">
          <FaSignOutAlt className="menu-icon" />
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      {/* Redes Sociais */}
  
      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaFacebook />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaInstagram />
        </a>
        <a
          href="https://wa.me/123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaWhatsapp />
        </a>
      </div>

    </div>
  );
};

export default Sidebar;
