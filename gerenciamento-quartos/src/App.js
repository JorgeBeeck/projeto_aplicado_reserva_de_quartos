import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import RoomManagementPage from './pages/RoomManagementPage';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import './App.css'; // Importe o arquivo CSS para estilização

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false); // Quando o usuário é carregado, define loading como false
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div class="spinner">
      <span class="spinner-item"></span>
      <span class="spinner-item"></span>
      <span class="spinner-item"></span>
   </div>
    );
  }

  return (
    <Router>
      {user && <Sidebar isOpen />} {/* Sidebar visível quando o usuário está logado */}
      
      <Routes>
        <Route path="/" element={user ? <Navigate to="/rooms" /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rooms" element={user ? <RoomManagementPage /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        {/* Adicionar mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
