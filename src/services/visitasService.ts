import axios from 'axios';

export const agendarVisita = async (visita: { data: string; imovelId: string; clienteId: string }) => {
  try {
    const response = await axios.post('/api/visitas', visita);
    return response.data;
  } catch (error) {
    console.error('Erro ao agendar visita:', error);
    throw error;
  }
};
