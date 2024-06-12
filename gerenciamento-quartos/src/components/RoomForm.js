import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const RoomForm = () => {
  const [roomName, setRoomName] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rooms'), {
        name: roomName,
        available: isAvailable,
      });
      setRoomName('');
      setIsAvailable(true);
    } catch (error) {
      console.error("Erro ao adicionar quarto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nome do Quarto" 
        value={roomName} 
        onChange={(e) => setRoomName(e.target.value)} 
      />
      <label>
        Disponível:
        <input 
          type="checkbox" 
          checked={isAvailable} 
          onChange={(e) => setIsAvailable(e.target.checked)} 
        />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default RoomForm;
