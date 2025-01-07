import React, { useState } from 'react';
import '../components/suporte.css';

const Suporte: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [mensagemEnviada, setMensagemEnviada] = useState<boolean>(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const handleEnviarMensagem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Exibindo log para depuração
      console.log('Enviando mensagem para o backend...');
      
      // Enviar os dados para o backend
      const response = await fetch('http://localhost:3000/enviar-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          mensagem,
        }),
      });

      // Tratando a resposta do backend
      if (response.ok) {
        console.log('Mensagem enviada com sucesso');
        setMensagemEnviada(true);
        setErroEnvio(null); // Limpar qualquer erro anterior
        setTimeout(() => setMensagemEnviada(false), 3000);
        setNome('');
        setEmail('');
        setMensagem('');
      } else {
        const errorText = await response.text();
        console.error('Erro ao enviar a mensagem:', errorText);
        setErroEnvio('Falha ao enviar a mensagem. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      setErroEnvio('Erro ao se conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <div className="suporte-container">
      <h1>Suporte ao Cliente</h1>
      <p>Estamos aqui para ajudar você! Confira as perguntas frequentes ou envie uma mensagem.</p>

      <div className="faq-section">
        <h2>Perguntas Frequentes</h2>
        <div className="faq-item">
          <h3>Como posso resetar minha senha?</h3>
          <p>
            Para resetar sua senha, acesse a página de login, clique em "Esqueci minha senha" e siga as instruções enviadas ao
            seu e-mail.
          </p>
        </div>
        <div className="faq-item">
          <h3>Como entro em contato com o suporte técnico?</h3>
          <p>Você pode preencher o formulário abaixo ou enviar um e-mail diretamente para suporte@exemplo.com.</p>
        </div>
        <div className="faq-item">
          <h3>Quais são os horários de atendimento?</h3>
          <p>Nosso suporte funciona de segunda a sexta-feira, das 8h às 18h (horário de Brasília).</p>
        </div>
      </div>

      <div className="contato-section">
        <h2>Entre em Contato</h2>
        <form onSubmit={handleEnviarMensagem}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
              placeholder="Descreva sua dúvida ou problema"
            ></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
        {mensagemEnviada && (
          <p className="mensagem-sucesso">Mensagem enviada com sucesso! Retornaremos em breve.</p>
        )}
        {erroEnvio && <p className="mensagem-erro">{erroEnvio}</p>}
      </div>
    </div>
  );
};

export default Suporte;
