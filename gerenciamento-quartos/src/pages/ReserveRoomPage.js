import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';

const ReserveRoomPage = () => {
  const navigate = useNavigate();
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [quartosDisponiveis, setQuartosDisponiveis] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar lista de clientes disponíveis
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesRef = collection(db, 'clientes');
        const snapshot = await getDocs(clientesRef);
        const clientesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClientes(clientesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClientes();
  }, []);

  // Função para buscar quartos disponíveis com base nas datas selecionadas
  const fetchQuartosDisponiveis = async () => {
    setLoading(true);
    try {
      const quartosRef = collection(db, 'quartos');
      const snapshot = await getDocs(quartosRef);
      const quartos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const quartosDisponiveis = quartos.filter(quarto => isQuartoDisponivel(quarto, dataInicio, dataFim));
      setQuartosDisponiveis(quartosDisponiveis);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Verificar se o quarto está disponível para as datas selecionadas
  const isQuartoDisponivel = (quarto, start, end) => {
    const reservas = quarto.reservas || [];
    for (let reserva of reservas) {
      const reservaInicio = reserva.dataInicio.toDate();
      const reservaFim = reserva.dataFim.toDate();
      if (reservaInicio <= new Date(end) && reservaFim >= new Date(start)) {
        return false;
      }
    }
    return true;
  };

  // Reservar quarto selecionado
  const handleReservarQuarto = async (quartoId) => {
    try {
      if (!clienteSelecionado) {
        alert('Por favor, selecione um cliente para fazer a reserva.');
        return;
      }
      const quartoRef = doc(db, 'quartos', quartoId); // Referência ao documento do quarto
      const reserva = {
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
        clienteId: clienteSelecionado
      };
      await updateDoc(quartoRef, {
        reservas: arrayUnion(reserva), // Adiciona a nova reserva ao array de reservas
        disponibilidade: false // Marca o quarto como indisponível
      });
      alert('Quarto reservado com sucesso!');
      navigate('/'); // Redireciona para a página inicial após a reserva
    } catch (error) {
      setError(error.message);
      alert(`Erro ao reservar quarto: ${error.message}`);
    }
  };

  // Submeter o formulário para buscar quartos disponíveis
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataInicio || !dataFim || !clienteSelecionado) {
      alert('Por favor, selecione as datas de início, fim e um cliente para continuar.');
      return;
    }
    fetchQuartosDisponiveis();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reservar Quarto</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Data de Início:</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          style={styles.input}
          required
        />
        <label>Data de Fim:</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          style={styles.input}
          required
        />
        <label>Cliente:</label>
        <select
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          style={styles.input}
          required // Campo obrigatório
        >
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.name} - {cliente.email}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          {loading ? 'Carregando...' : 'Buscar Quartos Disponíveis'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {quartosDisponiveis.length > 0 ? (
        <div style={styles.quartosDisponiveis}>
          <h2>Quartos Disponíveis:</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço por Noite</th>
                <th>Amenidades</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {quartosDisponiveis.map(quarto => (
                <tr key={quarto.id}>
                  <td style={styles.tableCell}>{quarto.id}</td>
                  <td style={styles.tableCell}>{quarto.nome}</td>
                  <td style={styles.tableCell}>{quarto.descricao}</td>
                  <td style={styles.tableCell}>R$ {quarto.precoPorNoite.toFixed(2)}</td>
                  <td style={styles.tableCell}>{quarto.amenidades.join(', ')}</td>
                  <td style={styles.tableCell}><img src={quarto.imagemUrl} alt={quarto.nome} style={styles.quartoImage} /></td>
                  <td style={styles.tableCell}>
                    <button onClick={() => handleReservarQuarto(quarto.id)} style={styles.buttonReservar}>
                      Reservar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>Nenhum quarto disponível para as datas selecionadas.</p>
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
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
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
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
  quartosDisponiveis: {
    width: '100%',
    maxWidth: '1200px',
    marginTop: '2rem',
    overflowX: 'auto', // Adiciona scroll horizontal caso haja muitos quartos
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'center',
  },
  quartoImage: {
    width: '100px', // Ajuste o tamanho da imagem conforme necessário
    height: 'auto',
    borderRadius: '4px',
    display: 'block', // Garante que a imagem não crie espaços indesejados
    margin: '0 auto', // Centraliza a imagem na célula da tabela
  },
  buttonReservar: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ReserveRoomPage;
