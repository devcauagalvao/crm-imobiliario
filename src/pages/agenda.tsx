import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Tarefa {
  descricao: string;
  data: string;
}

interface Colunas {
  [key: string]: {
    tarefas: Tarefa[];
    novaTarefa: string;
    novaData: string;
  };
}

const Agenda: React.FC = () => {
  const [colunas, setColunas] = useState<Colunas>(() => {
    const savedData = localStorage.getItem('colunas');
    return savedData
      ? JSON.parse(savedData)
      : {
          upcoming: { tarefas: [], novaTarefa: '', novaData: '' },
          inProgress: { tarefas: [], novaTarefa: '', novaData: '' },
          done: { tarefas: [], novaTarefa: '', novaData: '' },
        };
  });

  useEffect(() => {
    localStorage.setItem('colunas', JSON.stringify(colunas));
  }, [colunas]);

  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceColuna = source.droppableId;
    const destinationColuna = destination.droppableId;

    if (sourceColuna === destinationColuna) {
      return;
    }

    const sourceTasks = [...colunas[sourceColuna].tarefas];
    const destinationTasks = [...colunas[destinationColuna].tarefas];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, movedTask);

    const updatedColunas = {
      ...colunas,
      [sourceColuna]: { ...colunas[sourceColuna], tarefas: sourceTasks },
      [destinationColuna]: { ...colunas[destinationColuna], tarefas: destinationTasks },
    };

    setColunas(updatedColunas);
  };

  const adicionarTarefa = (colunaId: string) => {
    const { novaTarefa, novaData } = colunas[colunaId];
    if (!novaTarefa || !novaData) return;

    const novaTarefaObj: Tarefa = {
      descricao: novaTarefa,
      data: novaData,
    };

    const updatedColunas = {
      ...colunas,
      [colunaId]: {
        ...colunas[colunaId],
        tarefas: [...colunas[colunaId].tarefas, novaTarefaObj],
        novaTarefa: '',
        novaData: '',
      },
    };

    setColunas(updatedColunas);
  };

  const handleInputChange = (colunaId: string, field: 'novaTarefa' | 'novaData', value: string) => {
    setColunas({
      ...colunas,
      [colunaId]: {
        ...colunas[colunaId],
        [field]: value,
      },
    });
  };

  const styles: { [key: string]: React.CSSProperties } = {
    agendaContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      padding: '20px',
      backgroundColor: '#f4f5f7',
      minHeight: '100vh',
      flexWrap: 'wrap',
    },
    coluna: {
      width: '300px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      minHeight: '150px',
      overflow: 'hidden',
    },
    colunaTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#fff', // corrigido: removed duplicated color
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#0079bf',
      borderRadius: '8px',
      textAlign: 'center',
    },
    tarefasLista: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      overflowY: 'auto',
    },
    tarefaItem: {
      backgroundColor: '#ffffff',
      padding: '15px',
      marginBottom: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'move',
      transition: 'transform 0.2s ease, background-color 0.2s ease',
      border: '1px solid #e1e1e1',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '15px',
      gap: '10px',
    },
    input: {
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #d0d7e1',
      fontSize: '1rem',
      width: '100%',
    },
    buttonAdd: {
      padding: '12px 20px',
      backgroundColor: '#0079bf',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.agendaContainer}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {['upcoming', 'inProgress', 'done'].map((colunaId) => (
          <Droppable key={colunaId} droppableId={colunaId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={styles.coluna}
              >
                <h3 style={styles.colunaTitle}>
                  {colunaId.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </h3>
                <ul style={styles.tarefasLista}>
                  {colunas[colunaId].tarefas.map((tarefa, index) => (
                    <Draggable
                      key={`${colunaId}-${index}`}
                      draggableId={`${colunaId}-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{
                            ...styles.tarefaItem,
                            ...provided.draggableProps.style,
                          }}
                        >
                          <span>{tarefa.descricao} - {tarefa.data}</span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>

                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Descrição da Tarefa"
                    value={colunas[colunaId].novaTarefa}
                    onChange={(e) => handleInputChange(colunaId, 'novaTarefa', e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Data (ex: 2025-01-03)"
                    value={colunas[colunaId].novaData}
                    onChange={(e) => handleInputChange(colunaId, 'novaData', e.target.value)}
                    style={styles.input}
                  />
                  <button
                    style={styles.buttonAdd}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#005a8c'}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0079bf'}
                    onClick={() => adicionarTarefa(colunaId)}
                  >
                    Adicionar Tarefa
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Agenda;
