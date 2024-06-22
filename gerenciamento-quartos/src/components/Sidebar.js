// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarStyles = {
    width: '200px',
    backgroundColor: '#333',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: sidebarOpen ? '0' : '-200px',
    overflowX: 'hidden',
    transition: '0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    zIndex: 1000,
  };

  const ulStyles = {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  };

  const liStyles = {
    padding: '10px 15px',
    width: '100%',
  };

  const linkStyles = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  };

  const logoutStyles = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 'bold',
    backgroundColor: '#d32f2f',
    padding: '10px 15px',
    paddingBottom: '35px',
    borderRadius: '5px',
    marginTop: 'auto',
    width: '100%',
    textAlign: 'center',
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleButtonStyles = {
    position: 'fixed',
    top: '20px',
    left: sidebarOpen ? '220px' : '20px',
    width: '30px',
    height: '25px',
    display: 'flex',
    transition: '0.3s',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1001,
  };

  const lineStyles = {
    width: '100%',
    height: '3px',
    backgroundColor: '#333',
    borderRadius: '2px',
  };

  return (
    <>
      <div style={sidebarStyles}>
      <ul style={ulStyles}>
          <li style={liStyles}><Link to="/home" style={linkStyles}>HomePage</Link></li>
          <li style={liStyles}><Link to="/rooms" style={linkStyles}>Gerenciar Quartos</Link></li>
          <li style={liStyles}><Link to="/register-client" style={linkStyles}>Cadastrar Cliente</Link></li>
          <li style={liStyles}><Link to="/client-list" style={linkStyles}>Lista de Clientes</Link></li>
          <li style={liStyles}><Link to="/reserve-room" style={linkStyles}>Reservar quarto</Link></li>
          <li style={liStyles}><Link to="/create-room" style={linkStyles}>Adicionar quarto</Link></li>

          {/* Adicionar mais links conforme necessário */}
        </ul>
        <Link to="#" style={logoutStyles} onClick={handleLogout}>Deslogar</Link>
      </div>
      <div onClick={toggleSidebar} style={toggleButtonStyles}>
        <div style={lineStyles}></div>
        <div style={lineStyles}></div>
        <div style={lineStyles}></div>
      </div>
    </>
  );
};

export default Sidebar;
