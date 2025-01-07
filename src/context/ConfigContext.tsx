import React, { createContext, useState, ReactNode } from 'react';

// Defina o tipo de configuração
export type Configuracoes = {
  idioma: string;
  notificacoes: boolean;
  tema: string;
  modoDaltonismo: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  tamanhoFonte: number;
};

type ConfigContextType = {
  configuracoes: Configuracoes;
  setConfiguracoes: React.Dispatch<React.SetStateAction<Configuracoes>>;
};

// Valor inicial
const valorInicial: Configuracoes = {
  idioma: 'pt',
  notificacoes: true,
  tema: 'light',
  modoDaltonismo: 'normal',
  tamanhoFonte: 16,
};

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>(valorInicial);

  return (
    <ConfigContext.Provider value={{ configuracoes, setConfiguracoes }}>
      {children}
    </ConfigContext.Provider>
  );
};
