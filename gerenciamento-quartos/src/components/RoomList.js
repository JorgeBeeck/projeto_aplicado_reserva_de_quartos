// src/components/RoomList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomCollection);
      setRooms(roomSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchRooms();
  }, []);

  const toggleAvailability = async (id, currentStatus) => {
    const roomDoc = doc(db, 'rooms', id);
    await updateDoc(roomDoc, { available: !currentStatus });
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, available: !currentStatus } : room
    ));
  };

  return (
    <div>
      <h2>Lista de Quartos</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.name} - {room.available ? "Disponível" : "Indisponível"}
            <button onClick={() => toggleAvailability(room.id, room.available)}>
              {room.available ? "Marcar como Indisponível" : "Marcar como Disponível"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
