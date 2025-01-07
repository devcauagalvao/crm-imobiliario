import React, { useContext, useState } from "react";
import { ConfigContext, Configuracoes } from "../context/ConfigContext"; 
import "../components/config.css";

const PaginaConfiguracoes: React.FC = () => {
  const context = useContext(ConfigContext);
  const [mensagemSalva, setMensagemSalva] = useState<string | null>(null);

  if (!context) {
    return <div>Carregando configurações...</div>;
  }

  const { configuracoes, setConfiguracoes } = context;

  const handleConfiguracoesChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setConfiguracoes((prevConfiguracoes: Configuracoes) => ({
      ...prevConfiguracoes,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const alterarTamanhoFonte = (incremento: number) => {
    setConfiguracoes((prevConfiguracoes: Configuracoes) => ({
      ...prevConfiguracoes,
      tamanhoFonte: Math.max(12, prevConfiguracoes.tamanhoFonte + incremento),
    }));
  };

  const alternarModoDaltonismo = (modo: string) => {
    setConfiguracoes((prevConfiguracoes: Configuracoes) => ({
      ...prevConfiguracoes,
      modoDaltonismo: modo as Configuracoes["modoDaltonismo"],
    }));
  };

  const salvarConfiguracoes = () => {
    localStorage.setItem("configuracoes", JSON.stringify(configuracoes));
    setMensagemSalva("Configurações salvas com sucesso!");
    setTimeout(() => setMensagemSalva(null), 3000);
  };

  const estiloPagina: React.CSSProperties = {
    fontSize: `${configuracoes.tamanhoFonte}px`,
    filter:
      configuracoes.modoDaltonismo === "protanopia"
        ? "grayscale(50%) hue-rotate(-30deg)"
        : configuracoes.modoDaltonismo === "deuteranopia"
          ? "grayscale(50%) hue-rotate(30deg)"
          : configuracoes.modoDaltonismo === "tritanopia"
            ? "grayscale(50%) hue-rotate(180deg)"
            : "none",
    backgroundColor: "#F7F8FA",  // Cor de fundo da página
    color: "#333",  // Cor do texto
    display: "flex",
    flexDirection: "column",
    padding: "30px",  // Aumentando o padding
    borderRadius: "10px",  // Bordas arredondadas
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",  // Sombra suave
    maxWidth: "800px",  // Limita a largura da página
    margin: "0 auto",  // Centraliza a página
  };

  return (
    <div className="config-container" style={estiloPagina}>
      <h1 className="config-text-3xl font-bold mb-6 text-center">Configurações Gerais</h1>

      {/* Idioma */}
      <div className="config-card">
        <h2 className="config-text-xl font-semibold mb-4">Idioma</h2>
        <select
          name="idioma"
          value={configuracoes.idioma}
          onChange={handleConfiguracoesChange}
          className="config-select"
        >
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
        </select>
      </div>

      {/* Notificações */}
      <div className="config-card">
        <h2 className="config-text-xl font-semibold mb-4">Notificações</h2>
        <label className="config-checkbox">
          <input
            type="checkbox"
            name="notificacoes"
            checked={configuracoes.notificacoes}
            onChange={handleConfiguracoesChange}
            className="config-checkbox-input"
          />
          Ativar notificações gerais
        </label>
      </div>

      {/* Tema */}
      <div className="config-card">
        <h2 className="config-text-xl font-semibold mb-4">Tema</h2>
        <div className="config-flex">
          <label className="config-radio-label">Claro</label>
          <input
            type="radio"
            name="tema"
            value="light"
            checked={configuracoes.tema === "light"}
            onChange={handleConfiguracoesChange}
            className="config-radio-input"
          />
          <label className="config-radio-label">Escuro</label>
          <input
            type="radio"
            name="tema"
            value="dark"
            checked={configuracoes.tema === "dark"}
            onChange={handleConfiguracoesChange}
            className="config-radio-input"
          />
        </div>
      </div>

      {/* Daltonismo */}
      <div className="config-card">
        <h2 className="config-text-xl font-semibold mb-4">Modo Daltonismo</h2>
        <div className="config-flex">
          <button
            onClick={() => alternarModoDaltonismo("normal")}
            className="config-btn-normal"
          >
            Normal
          </button>
          <button
            onClick={() => alternarModoDaltonismo("protanopia")}
            className="config-btn-daltonismo"
          >
            Protanopia
          </button>
          <button
            onClick={() => alternarModoDaltonismo("deuteranopia")}
            className="config-btn-daltonismo"
          >
            Deuteranopia
          </button>
          <button
            onClick={() => alternarModoDaltonismo("tritanopia")}
            className="config-btn-daltonismo"
          >
            Tritanopia
          </button>
        </div>
      </div>

      {/* Tamanho da Fonte */}
      <div className="config-card">
        <h2 className="config-text-xl font-semibold mb-4">Tamanho da Fonte</h2>
        <div className="config-flex">
          <button
            onClick={() => alterarTamanhoFonte(2)}
            className="config-btn-tamanho"
          >
            Aumentar
          </button>
          <button
            onClick={() => alterarTamanhoFonte(-2)}
            className="config-btn-tamanho"
          >
            Diminuir
          </button>
        </div>
      </div>

      {/* Botão de Salvar */}
      <div className="config-mt-6">
        <button
          onClick={salvarConfiguracoes}
          className="config-btn-salvar"
        >
          Salvar Configurações
        </button>
        {mensagemSalva && (
          <p className="config-text-green-500 mt-2 text-center">{mensagemSalva}</p>
        )}
      </div>
    </div>
  );
};

export default PaginaConfiguracoes;
