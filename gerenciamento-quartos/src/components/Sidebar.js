// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const sidebarStyles = {
    width: '200px',
    backgroundColor: '#333',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: isOpen ? '0' : '-200px',
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
  };

  const logoutStyles = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 'bold',
    backgroundColor: '#d32f2f',
    padding: '10px 15px',
    paddingBottom: '50px',
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

  return (
    <div style={sidebarStyles}>
      <ul style={ulStyles}>
        <li style={liStyles}><Link to="/home" style={linkStyles}>HomePage</Link></li>
        <li style={liStyles}><Link to="/rooms" style={linkStyles}>Gerenciar Quartos</Link></li>
        {/* Adicionar mais links conforme necessário */}
      </ul>
      <Link to="#" style={logoutStyles} onClick={handleLogout}>Sair</Link>
    </div>
  );
};

export default Sidebar;
