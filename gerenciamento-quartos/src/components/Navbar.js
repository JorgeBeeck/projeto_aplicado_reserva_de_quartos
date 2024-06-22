// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center'
  };

  const brandStyle = {
    fontSize: '1.5em'
  };

  return (
    <nav style={navbarStyle}>
      <div style={brandStyle}>app quartos</div>
    </nav>
  );
};

export default Navbar;
