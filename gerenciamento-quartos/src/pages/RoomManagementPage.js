// src/pages/RoomManagementPage.js
import React from 'react';
import RoomForm from '../components/RoomForm';
import RoomList from '../components/RoomList';

const RoomManagementPage = () => {
  return (
    <div>
      <h1>Gerenciamento de Quartos</h1>
      <RoomForm />
      <RoomList />
    </div>
  );
};

export default RoomManagementPage;
