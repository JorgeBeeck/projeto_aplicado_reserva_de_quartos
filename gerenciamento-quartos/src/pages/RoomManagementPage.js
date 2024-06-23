import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const RoomManagementPage = () => {
  const [quartos, setQuartos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuartos = async () => {
      setLoading(true);
      try {
        const quartosRef = collection(db, 'quartos');
        const snapshot = await getDocs(quartosRef);
        const quartosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuartos(quartosData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuartos();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Carregando quartos...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciamento de Quartos</h1>
      {quartos.length === 0 ? (
        <p style={styles.emptyMessage}>Nenhum quarto encontrado.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Descrição</th>
                <th style={styles.th}>Preço por Noite</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {quartos.map(quarto => (
                <tr key={quarto.id} style={styles.tr}>
                  <td style={styles.td}>{quarto.id}</td>
                  <td style={styles.td}>{quarto.nome}</td>
                  <td style={styles.td}>{quarto.descricao}</td>
                  <td style={styles.td}>R$ {quarto.precoPorNoite.toFixed(2)}</td>
                  <td style={styles.td}>
                    <Link to={`/room-detail/${quarto.id}`} style={styles.link}>
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    marginBottom: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '800px',
    marginTop: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },
  th: {
    padding: '12px',
    backgroundColor: '#f2f2f2',
    color: '#333',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
    textTransform: 'uppercase',
  },
  tr: {
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  link: {
    textDecoration: 'none',
    color: '#007BFF',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#888',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default RoomManagementPage;
