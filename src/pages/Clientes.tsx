import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';
import { collection, getDocs } from 'firebase/firestore'; // Importe do Firebase
import { db } from '../services/firebaseconfig'; // Importe a configuração do Firestore

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Função para buscar os clientes diretamente no Firestore
    const fetchClientes = async () => {
      try {
        const clientesRef = collection(db, 'clientes'); // Referência à coleção de clientes no Firestore
        const clientesSnapshot = await getDocs(clientesRef); // Obtenção dos documentos
        const clientesList = clientesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Cliente[];
        setClientes(clientesList); // Atualiza o estado com os clientes obtidos
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []); // A dependência vazia [] garante que a busca seja feita apenas uma vez após o primeiro render

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li> // Exibe o nome de cada cliente
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
