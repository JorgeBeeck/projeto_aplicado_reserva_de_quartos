// src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Futura Dashboard</h1>
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
    fontFamily: 'Arial, sans-serif',
    fontSize: '3rem',
    color: '#333',
  },
};

export default HomePage;
