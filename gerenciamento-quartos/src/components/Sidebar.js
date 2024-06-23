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
    width: '220px',
    backgroundColor: '#F79A87',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: sidebarOpen ? '0' : '-220px',
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
    marginBottom: '10px',
    width: '90%',
    margin: '10px auto', // Adiciona margem entre os itens
  };

  const linkStyles = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const linkHoverStyles = {
    backgroundColor: '#FFB4A9',
    color: '#333',
  };

  const logoutStyles = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 'bold',
    backgroundColor: '#d32f2f',
    padding: '24px',
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
    left: sidebarOpen ? '240px' : '20px',
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
    backgroundColor: '#F15E5E',
    borderRadius: '2px',
  };

  return (
    <>
      <div style={sidebarStyles}>
        <ul style={ulStyles}>
          <li style={liStyles}><Link to="/home" style={linkStyles} className="sidebar-link">HomePage</Link></li>
          <li style={liStyles}><Link to="/rooms" style={linkStyles} className="sidebar-link">Gerenciar Quartos</Link></li>
          <li style={liStyles}><Link to="/register-client" style={linkStyles} className="sidebar-link">Cadastrar Cliente</Link></li>
          <li style={liStyles}><Link to="/client-list" style={linkStyles} className="sidebar-link">Lista de Clientes</Link></li>
          <li style={liStyles}><Link to="/reserve-room" style={linkStyles} className="sidebar-link">Reservar quarto</Link></li>
          <li style={liStyles}><Link to="/create-room" style={linkStyles} className="sidebar-link">Adicionar quarto</Link></li>
          {/* Adicionar mais links conforme necessário */}
        </ul>
        <Link to="#" style={logoutStyles} onClick={handleLogout}>Sair</Link>
      </div>
      <div onClick={toggleSidebar} style={toggleButtonStyles}>
        <div style={lineStyles}></div>
        <div style={lineStyles}></div>
        <div style={lineStyles}></div>
      </div>
      <style>
        {`
          .sidebar-link:hover {
            background-color: #FFB4A9;
            color: #333;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
