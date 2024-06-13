// src/pages/RegisterClientPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const RegisterClientPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'clientes'), {
        cpf,
        name,
        email,
      });
      alert('Cliente cadastrado com sucesso!');
      navigate(0); // Recarrega a página
    } catch (error) {
      setError(error.message);
      alert(`Erro ao cadastrar cliente: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Estilos inline para a página de cadastro de clientes
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

export default RegisterClientPage;
