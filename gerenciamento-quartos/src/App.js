// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import RoomManagementPage from './pages/RoomManagementPage';

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
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/rooms" /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/rooms"
          element={user ? <RoomManagementPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
