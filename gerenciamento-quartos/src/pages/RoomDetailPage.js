import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RoomDetailPage = () => {
  const { id } = useParams();
  const [quarto, setQuarto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    precoPorNoite: 0,
    ocupacaoMaxima: 0,
    imagemUrl: '',
    amenidades: '',
  });

  useEffect(() => {
    const fetchQuarto = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'quartos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const quartoData = { id: docSnap.id, ...docSnap.data() };
          setQuarto(quartoData);
          // Atualiza o estado do formulário com os dados do quarto
          setFormData({
            nome: quartoData.nome,
            descricao: quartoData.descricao,
            precoPorNoite: quartoData.precoPorNoite,
            ocupacaoMaxima: quartoData.ocupacaoMaxima,
            imagemUrl: quartoData.imagemUrl,
            amenidades: quartoData.amenidades.join(', '), // Converte array de amenidades para string separada por vírgula
          });
        } else {
          setError('Quarto não encontrado.');
        }
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar informações do quarto.');
        setLoading(false);
      }
    };

    fetchQuarto();
  }, [id]);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); // Converte Timestamp para Date
    return date.toLocaleDateString('pt-BR'); // Formata a data no formato "dd/mm/yyyy"
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'quartos', id);
      await updateDoc(docRef, {
        nome: formData.nome,
        descricao: formData.descricao,
        precoPorNoite: parseFloat(formData.precoPorNoite),
        ocupacaoMaxima: parseInt(formData.ocupacaoMaxima),
        imagemUrl: formData.imagemUrl,
        amenidades: formData.amenidades.split(',').map((item) => item.trim()), // Converte string de amenidades para array
      });
      setEditMode(false);
      setQuarto({
        ...quarto,
        nome: formData.nome,
        descricao: formData.descricao,
        precoPorNoite: parseFloat(formData.precoPorNoite),
        ocupacaoMaxima: parseInt(formData.ocupacaoMaxima),
        imagemUrl: formData.imagemUrl,
        amenidades: formData.amenidades.split(',').map((item) => item.trim()), // Converte string de amenidades para array
      });
    } catch (error) {
      console.error('Erro ao atualizar o quarto:', error);
      setError('Erro ao atualizar o quarto. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return <p>Carregando informações do quarto...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  if (!quarto) {
    return <p>Quarto não encontrado.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Detalhes do Quarto - {quarto.nome}</h1>
      <div style={styles.card}>
        <img src={quarto.imagemUrl} alt={quarto.nome} style={styles.quartoImage} />
        <div style={styles.details}>
          {!editMode ? (
            <>
              <p><strong>ID:</strong> {quarto.id}</p>
              <p><strong>Descrição:</strong> {quarto.descricao}</p>
              <p><strong>Preço por Noite:</strong> R$ {quarto.precoPorNoite.toFixed(2)}</p>
              <p><strong>Ocupação Máxima:</strong> {quarto.ocupacaoMaxima}</p>
              <p><strong>Amenidades:</strong> {quarto.amenidades.join(', ')}</p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
              </label>
              <label>
                Descrição:
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
              </label>
              <label>
                Preço por Noite:
                <input type="number" name="precoPorNoite" value={formData.precoPorNoite} onChange={handleChange} required />
              </label>
              <label>
                Ocupação Máxima:
                <input type="number" name="ocupacaoMaxima" value={formData.ocupacaoMaxima} onChange={handleChange} required />
              </label>
              <label>
                Amenidades (separadas por vírgula):
                <input type="text" name="amenidades" value={formData.amenidades} onChange={handleChange} required />
              </label>
              <label>
                URL da Imagem:
                <input type="url" name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} required />
              </label>
              <button type="submit">Salvar</button>
            </form>
          )}
          {!editMode && (
            <button style={styles.editButton} onClick={handleEdit}>Editar</button>
          )}
        </div>
      </div>

      <h1 style={styles.title}>Histórico de Reservas {quarto.nome}</h1>
      {quarto.reservas && quarto.reservas.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th style={styles.tableHead}>ID da Reserva</th>
              <th style={styles.tableHead}>Data de Check-in</th>
              <th style={styles.tableHead}>Data de Check-out</th>
              <th style={styles.tableHead}>Cliente ID</th>
            </tr>
          </thead>
          <tbody>
            {quarto.reservas.map((reserva, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{formatDate(reserva.dataInicio)}</td>
                <td style={styles.tableCell}>{formatDate(reserva.dataFim)}</td>
                <td style={styles.tableCell}>{reserva.clienteId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma reserva encontrada para este quarto.</p>
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
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  quartoImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  details: {
    width: '100%',
    marginTop: '20px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  subtitle: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginTop: '10px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableHead: {
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px 15px',
    verticalAlign: 'top',
    color: '#555',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};

export default RoomDetailPage;
