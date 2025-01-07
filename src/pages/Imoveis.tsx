import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseconfig'; // Importando a instância do Firestore
import '../components/imoveis.css';

const Imoveis = () => {
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para cadastrar um novo imóvel no Firestore
  const cadastrarImovel = async (imovel: { nome: string, descricao: string, preco: number, localizacao: any }) => {
    try {
      const imoveisRef = collection(db, 'imoveis'); // Referência para a coleção 'imoveis' no Firestore
      await addDoc(imoveisRef, {
        nome: imovel.nome,
        descricao: imovel.descricao,
        preco: imovel.preco,
        localizacao: imovel.localizacao,
      });

      console.log("Imóvel cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar imóvel: ", error);
      alert("Erro ao cadastrar o imóvel. Tente novamente.");
    }
  };

  // Função para buscar todos os imóveis do Firestore
  const fetchImoveis = async () => {
    try {
      const imoveisRef = collection(db, 'imoveis');
      const snapshot = await getDocs(imoveisRef); // Obtém os documentos da coleção

      if (snapshot.empty) {
        console.log("Nenhum imóvel encontrado");
        return [];
      }

      // Converte os dados para o formato correto
      const imoveisData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return imoveisData;
    } catch (error) {
      console.error("Erro ao buscar imóveis: ", error);
      return [];
    }
  };

  // Atualiza a lista de imóveis sempre que o componente for montado
  useEffect(() => {
    const getImoveis = async () => {
      const fetchedImoveis = await fetchImoveis();
      setImoveis(fetchedImoveis);
    };

    getImoveis();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!nome || !descricao || !preco || !rua || !bairro || !numero || !cep) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    setIsLoading(true); // Começa o carregamento
    try {
      const localizacao = {
        rua,
        bairro,
        numero,
        cep
      };

      const imovel = { nome, descricao, preco, localizacao };

      console.log("Imóvel a ser cadastrado:", imovel); // Verifique os dados do imóvel

      // Cadastrar o imóvel
      await cadastrarImovel(imovel);

      // Atualiza a lista de imóveis após o cadastro
      const fetchedImoveis = await fetchImoveis();
      setImoveis(fetchedImoveis);

      // Limpar campos
      setNome('');
      setDescricao('');
      setPreco(0);
      setRua('');
      setBairro('');
      setNumero('');
      setCep('');
    } catch (error) {
      console.error("Erro ao cadastrar imóvel: ", error);
      alert("Erro ao cadastrar o imóvel. Tente novamente.");
    } finally {
      setIsLoading(false); 
    }
  };

  const ImovelItem = ({ imovel }: { imovel: any }) => (
    <div className="property-item">
      <h4 className="property-item-title">{imovel.nome}</h4>
      <p className="property-item-description">{imovel.descricao}</p>
      <p className="property-item-description">{`Preço: R$ ${imovel.preco}`}</p>
      <p className="property-item-description">{`Endereço: ${imovel.localizacao?.rua || 'Não especificado'}, ${imovel.localizacao?.numero || 'Não especificado'}, ${imovel.localizacao?.bairro || 'Não especificado'}, ${imovel.localizacao?.cep || 'Não especificado'}`}</p>
    </div>
  );

  return (
    <div className="imovel-app-container">
      <h2 className="main-title">Cadastro de Imóveis</h2>

      <div className="property-panels-wrapper">
        <div className="cad-property-panel">
          <h3 className="property-panel-title">Cadastro de Imóvel</h3>
          <form onSubmit={handleSubmit} className="property-form-container">
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="nome">Nome do Imóvel</label>
              <input className="property-form-input" id="nome" type="text" placeholder="Nome do Imóvel" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="descricao">Descrição</label>
              <input className="property-form-input" id="descricao" type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="preco">Preço</label>
              <input className="property-form-input" id="preco" type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
            </div>
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="rua">Rua</label>
              <input className="property-form-input" id="rua" type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
            </div>
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="bairro">Bairro</label>
              <input className="property-form-input" id="bairro" type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </div>
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="numero">Número</label>
              <input className="property-form-input" id="numero" type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>
            <div className="property-form-section">
              <label className="property-form-section-label" htmlFor="cep">CEP</label>
              <input className="property-form-input" id="cep" type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
            </div>
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar Imóvel'}
            </button>
          </form>
        </div>

        <div className="property-panel">
          <h3 className="property-panel-title">Imóveis Cadastrados</h3>
          {imoveis.length === 0 ? (
            <p>Não há imóveis cadastrados.</p>
          ) : (
            imoveis.map(imovel => <ImovelItem key={imovel.id} imovel={imovel} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Imoveis;
