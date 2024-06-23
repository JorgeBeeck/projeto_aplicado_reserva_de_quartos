// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Inicia a sidebar fechada

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const sidebarStyles = {
    width: '220px',
    backgroundColor: '#F79A87',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: sidebarOpen ? '0' : '-220px',
    transition: '0.3s',
    zIndex: 1000,
  };

  const ulStyles = {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    marginTop: '20px', // Adiciona espaço acima da lista de links
  };

  const liStyles = {
    marginBottom: '10px',
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

  const logoutStyles = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 'bold',
    backgroundColor: '#d32f2f',
    padding: '24px',
    textAlign: 'center',
    marginTop: 'auto', // Coloca o link de logout na parte inferior
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: sidebarOpen ? '100%' : '0',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semi-transparente
    opacity: sidebarOpen ? '1' : '0',
    transition: 'opacity 0.3s',
    pointerEvents: sidebarOpen ? 'auto' : 'none', // Habilita ou desabilita interações com o overlay
    zIndex: 999, // Coloca o overlay abaixo da sidebar
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
      {/* Overlay para cobrir a tela principal quando a sidebar estiver aberta */}
      <div style={overlayStyles}></div>
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
