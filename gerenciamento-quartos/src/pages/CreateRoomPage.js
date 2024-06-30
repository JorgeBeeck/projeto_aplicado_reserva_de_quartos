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
        imagemUrl,
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
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Adicionar Novo Quarto</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            <p style={styles.labelText}>Nome do Quarto</p>
            <input
              type="text"
              placeholder="Digite o Nome Do Quarto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            <p style={styles.labelText}>Descrição</p>
            <textarea
              placeholder="Digite Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={styles.input}
              required
            ></textarea>
          </label>
          <label style={styles.label}>
            <p style={styles.labelText}>Ocupação Máxima</p>
            <input
              type="number"
              placeholder="Digite Ocupação Máxima"
              value={ocupacaoMaxima}
              onChange={(e) => setOcupacaoMaxima(e.target.value)}
              min="1"
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            <p style={styles.labelText}>Disponibilidade</p>
            <select
              value={disponibilidade}
              onChange={(e) => setDisponibilidade(e.target.value === 'true')}
              style={styles.input}
              required
            >
              <option value="true">Disponível</option>
              <option value="false">Indisponível</option>
            </select>
          </label>
          <label style={styles.label}>
            <p style={styles.labelText}>Preço por Noite</p>
            <input
              type="number"
              placeholder="Digite Preço por Noite"
              value={precoPorNoite}
              onChange={(e) => setPrecoPorNoite(e.target.value)}
              step="0.01"
              min="0"
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            <p style={styles.labelText}>Amenidades (separadas por vírgula)</p>
            <textarea
              placeholder="Digite Amenidades (separadas por vírgula)"
              value={amenidades}
              onChange={(e) =>
                setAmenidades(e.target.value.split(',').map((item) => item.trim()))
              }
              style={styles.input}
              required
            ></textarea>
          </label>
          <label style={styles.label}>
            <p style={styles.labelText}>URL da Imagem</p>
            <input
              type="text"
              placeholder="cole URL da Imagem"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Carregando...' : 'Criar Quarto'}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '48px',
    paddingBottom: '48px',
    height: '100vh',
    width: '100vw',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    margin: '48px',
    padding: '24px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '480px',
    maxWidth: '90%',
  },
  title: {
    marginBottom: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    width: '100%',
    marginBottom: '1rem',
  },
  labelText: {
    marginBottom: '0.5rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
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
    backgroundColor: '#72B5A4',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
};

export default CreateRoomPage;
