import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoomManagementPage from './pages/RoomManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rooms" element={<RoomManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
