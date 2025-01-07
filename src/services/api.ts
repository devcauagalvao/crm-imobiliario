import axios from 'axios';

// Definindo a URL base da API usando variável de ambiente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Usando a variável de ambiente
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para registrar um usuário
export const registerUser = async (nome: string, email: string, senha: string) => {
  try {
    const response = await api.post('/register', { nome, email, senha });
    return response.data; // Retorna os dados da resposta (ex: token JWT)
  } catch (error) {
    throw error; // Retorna o erro caso ocorra
  }
};

// Função para fazer login de um usuário
export const loginUser = async (email: string, senha: string) => {
  try {
    const response = await api.post('/login', { email, senha });
    return response.data; // Retorna os dados da resposta (ex: token JWT)
  } catch (error) {
    throw error; // Retorna o erro caso ocorra
  }
};

// Função para acessar rota protegida com token JWT
export const fetchProtectedData = async (token: string) => {
  try {
    const response = await api.get('/protected', {
      headers: {
        Authorization: `Bearer ${token}`, // Passando o token no cabeçalho
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw error; // Retorna o erro caso ocorra
  }
};

export default api;
