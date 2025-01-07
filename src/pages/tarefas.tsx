import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuração do localizador de data
const localizer = momentLocalizer(moment);

interface Lembrete {
  titulo: string;
  inicio: Date;
  fim: Date;
}

const CalendarioApp: React.FC = () => {
  const [eventos, setEventos] = useState<Lembrete[]>([]);

  // Função para adicionar evento ao calendário
  const handleSelectSlot = (slotInfo: any) => {
    const titulo = prompt("Digite o título do lembrete");
    if (titulo) {
      const novoLembrete: Lembrete = {
        titulo,
        inicio: slotInfo.start,
        fim: slotInfo.end,
      };
      
      // Verificando os valores dos slots selecionados
      console.log('Novo evento:', novoLembrete);

      // Convertendo as datas para objetos Moment (garantir compatibilidade com o React Big Calendar)
      novoLembrete.inicio = moment(novoLembrete.inicio).toDate();
      novoLembrete.fim = moment(novoLembrete.fim).toDate();

      // Atualizando o estado com o novo evento
      setEventos([...eventos, novoLembrete]);
    }
  };

  // Função para customizar o estilo do evento (lembrete)
  const customizarEvento = (evento: Lembrete) => {
    console.log('Evento customizado:', evento); // Verificando os dados do evento
    const corAleatoria = '#' + Math.floor(Math.random()*16777215).toString(16); // Gera uma cor aleatória
    return {
      style: {
        backgroundColor: corAleatoria,
        color: '#fff', // Cor do texto
        borderRadius: '8px',
        padding: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center' as 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombras para dar profundidade
        transition: 'all 0.3s ease', // Animação suave
        minHeight: '40px', // Garantir que o evento tenha uma altura mínima
      },
    };
  };

  // Estilos do componente com tipagem explícita
  const estilos: { [key: string]: React.CSSProperties } = {
    container: {
      height: '90vh',
      display: 'flex',
      flexDirection: 'column' as 'column',
      padding: '40px',
      marginLeft: '290px',
      background: 'linear-gradient(135deg, #f4f4f9 30%, #e9eff5 100%)', // Gradiente de fundo
      borderRadius: '20px',
    },
    titulo: {
      fontSize: '2rem',
      color: '#3A3A3A',
      textAlign: 'center' as 'center',
      marginBottom: '20px',
      fontFamily: '"Roboto", sans-serif',
    },
    calendario: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      padding: '10px',
    },
  };

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>Calendário de Lembretes</h1>
      <div style={estilos.calendario}>
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="inicio"
          endAccessor="fim"
          onSelectSlot={handleSelectSlot}
          selectable
          defaultView="month"
          views={['month', 'week', 'day']}
          eventPropGetter={customizarEvento} // Aplica a personalização do estilo do evento
        />
      </div>
    </div>
  );
};

export default CalendarioApp;
