// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, getDocs, limit, where } from 'firebase/firestore';

const HomePage = () => {
  const [clients, setClients] = useState([]);
  const [growthPercentage, setGrowthPercentage] = useState(0);

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

    const fetchGrowthPercentage = async () => {
      const db = getFirestore();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() retorna de 0 a 11
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

      const clientsCollection = collection(db, 'clientes');
      const queryRef = query(clientsCollection, where('month', '==', currentMonth));

      try {
        const currentMonthSnapshot = await getDocs(queryRef);
        const currentMonthCount = currentMonthSnapshot.size;

        let lastMonthCount = 0;
        if (lastMonth !== currentMonth) {
          const lastMonthQueryRef = query(clientsCollection, where('month', '==', lastMonth));
          const lastMonthSnapshot = await getDocs(lastMonthQueryRef);
          lastMonthCount = lastMonthSnapshot.size;
        }

        const percentage = lastMonthCount === 0 ? 100 : ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;
        setGrowthPercentage(percentage.toFixed(2));
      } catch (error) {
        console.error('Erro ao calcular crescimento mensal:', error);
      }
    };

    fetchClients();
    fetchGrowthPercentage();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Total de Clientes: {clients.length}</h2>
          <div style={styles.cardContent}>
            {clients.length > 0 ? (
              <ul style={styles.list}>
                {clients.map((client, index) => (
                  <li key={index} style={styles.listItem}>
                    <p>{client}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum cliente registrado</p>
            )}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Crescimento Mensal</h2>
          <div style={styles.cardContent}>
            <p style={styles.growthPercentage}>{growthPercentage}%</p>
          </div>
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
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
  },
  title: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '3rem',
    color: '#fff',
    marginBottom: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#F79A87',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#fff',
  },
  cardTitle: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '2rem',
    color: '#fff',
    borderBottom: '2px solid #fff',
    paddingBottom: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  growthPercentage: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default HomePage;
