import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, getDocs, limit } from 'firebase/firestore';

const HomePage = () => {
  const [clients, setClients] = useState([]);
  const [growthPercentage, setGrowthPercentage] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const db = getFirestore();
      const clientsCollection = collection(db, 'clientes');
      const clientsQuery = query(clientsCollection, orderBy('name'), limit(5));

      try {
        const snapshot = await getDocs(clientsQuery);
        const clientsData = snapshot.docs.map(doc => doc.data().name);
        setClients(clientsData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    const fetchReservations = async () => {
      const db = getFirestore();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

      const clientsCollection = collection(db, 'clientes');
      const currentMonthQuery = query(clientsCollection, where('month', '==', currentMonth));

      try {
        const currentMonthSnapshot = await getDocs(currentMonthQuery);
        const currentMonthCount = currentMonthSnapshot.size;

        let lastMonthCount = 0;
        if (lastMonth !== currentMonth) {
          const lastMonthQuery = query(clientsCollection, where('month', '==', lastMonth));
          const lastMonthSnapshot = await getDocs(lastMonthQuery);
          lastMonthCount = lastMonthSnapshot.size;
        }

        const percentage = lastMonthCount === 0 ? 100 : ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;
        setGrowthPercentage(percentage.toFixed(2));
      } catch (error) {
        console.error('Erro ao calcular crescimento mensal:', error);
      } finally {
        setLoading(false); // Desativa o estado de carregamento
      }
    };

    fetchClients();
    fetchReservations();
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeTitle}> Pousada Quinta do Ypuã</h1>
      <h2 style={styles.welcomeSubtitle}>
      Olá, Colaborador!
      </h2>

      <div style={styles.gridContainer}>
        {/* Últimos clientes */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Últimos 5 clientes cadastrados</h2>
          <div style={styles.cardContent}>
            {loading ? (
              <p>Carregando clientes...</p>
            ) : clients.length > 0 ? (
              <ul style={styles.list}>
                {clients.map((client, index) => (
                  <li key={index} style={styles.listItem}>
                    {client}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum cliente registrado.</p>
            )}
          </div>
        </div>

        {/* Reservas Ativas */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Próximas Reservas</h2>
          <div style={styles.cardContent}>
            {loading ? (
              <p>Calculando crescimento...</p>
            ) : (
              <p style={styles.growthPercentage}>{growthPercentage}%</p>
            )}
          </div>
        </div>

        {/* Crescimento Mensal */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Crescimento Mensal</h2>
          <div style={styles.cardContent}>
            <h2 style={styles.growthPercentage}>{growthPercentage}%</h2>
          </div>
          <h3 style={styles.dateTitle}>Hoje: {getCurrentDate()}</h3>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    padding: '40px 20px',
    backgroundColor: '#f0f0f0',
  },
  welcomeTitle: {
    fontSize: '2.8rem',
    color: '#333',
    marginBottom: '15px',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: '1.6rem',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
  },
  card: {
    backgroundColor: '#F79A87',
    borderRadius: '10px',
    padding: '20px',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.8rem',
    borderBottom: '2px solid rgba(255, 255, 255, 0.6)',
    paddingBottom: '10px',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  growthPercentage: {
    fontSize: '2.5rem',
    textAlign: 'center',
  },
  dateTitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginTop: '10px',
  },
  
};

export default HomePage;
