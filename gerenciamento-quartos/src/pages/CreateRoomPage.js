// src/pages/CreateRoomPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ocupacaoMaxima, setOcupacaoMaxima] = useState(1);
  const [disponibilidade, setDisponibilidade] = useState(true);
  const [precoPorNoite, setPrecoPorNoite] = useState(0);
  const [amenidades, setAmenidades] = useState([]);
  const [imagemUrl, setImagemUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'quartos'), {
        nome,
        descricao,
        ocupacaoMaxima: parseInt(ocupacaoMaxima),
        disponibilidade,
        precoPorNoite: parseFloat(precoPorNoite),
        amenidades,
        imagemUrl
      });
      alert('Quarto criado com sucesso!');
      navigate('/rooms'); // Redireciona para a página de gerenciamento de quartos
    } catch (error) {
      setError(error.message);
      alert(`Erro ao criar quarto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Criar Novo Quarto</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={styles.input}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Ocupação Máxima"
          value={ocupacaoMaxima}
          onChange={(e) => setOcupacaoMaxima(e.target.value)}
          min="1"
          style={styles.input}
          required
        />
        <select
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value === 'true')}
          style={styles.input}
          required
        >
          <option value="true">Disponível</option>
          <option value="false">Indisponível</option>
        </select>
        <input
          type="number"
          placeholder="Preço por Noite"
          value={precoPorNoite}
          onChange={(e) => setPrecoPorNoite(e.target.value)}
          step="0.01"
          min="0"
          style={styles.input}
          required
        />
        <textarea
          placeholder="Amenidades (separadas por vírgula)"
          value={amenidades}
          onChange={(e) => setAmenidades(e.target.value.split(',').map(item => item.trim()))}
          style={styles.input}
          required
        ></textarea>
        <input
          type="text"
          placeholder="URL da Imagem"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {loading ? 'Carregando...' : 'Criar Quarto'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  title: {
    marginBottom: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  form: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};

export default CreateRoomPage;
