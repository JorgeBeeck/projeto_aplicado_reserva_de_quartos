// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import RoomManagementPage from './pages/RoomManagementPage';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import RegisterClientPage from './pages/RegisterClientPage';
import ClientListPage from './pages/ClientListPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="loading-container">
      <div className="spinner">
        <span className="spinner-item"></span>
        <span className="spinner-item"></span>
        <span className="spinner-item"></span>
      </div>
    </div>;
  }

  return (
    <Router>
      {user && <Sidebar isOpen />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/rooms" /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rooms" element={user ? <RoomManagementPage /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register-client" element={user ? <RegisterClientPage /> : <Navigate to="/login" />} />
        <Route path="/client-list" element={user ? <ClientListPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
