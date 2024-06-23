import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const ClientListPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClient, setEditClient] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', cpf: '', email: '' });

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const clientsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientsList);
      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'clientes', id));
      setClients(clients.filter((client) => client.id !== id));
      alert('Cliente removido com sucesso!');
    } catch (error) {
      alert(`Erro ao remover cliente: ${error.message}`);
    }
  };

  const handleEdit = (client) => {
    setEditClient(client);
    setEditValues({ name: client.name, cpf: client.cpf, email: client.email });
  };

  const handleSave = async () => {
    try {
      const clientRef = doc(db, 'clientes', editClient.id);
      await updateDoc(clientRef, {
        name: editValues.name,
        cpf: editValues.cpf,
        email: editValues.email,
      });
      setClients(clients.map((client) => 
        client.id === editClient.id ? { ...client, ...editValues } : client
      ));
      setEditClient(null);
      alert('Cliente atualizado com sucesso!');
    } catch (error) {
      alert(`Erro ao atualizar cliente: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Clientes</h1>
      {editClient ? (
        <div style={styles.editForm}>
          <h2>Editar Cliente</h2>
          <input 
            type="text" 
            placeholder="Nome" 
            value={editValues.name} 
            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} 
            style={styles.input}
          />
          <input 
            type="text" 
            placeholder="CPF" 
            value={editValues.cpf} 
            onChange={(e) => setEditValues({ ...editValues, cpf: e.target.value })} 
            style={styles.input}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={editValues.email} 
            onChange={(e) => setEditValues({ ...editValues, email: e.target.value })} 
            style={styles.input}
          />
          <button onClick={handleSave} style={styles.saveButton}>Salvar</button>
          <button onClick={() => setEditClient(null)} style={styles.cancelButton}>Cancelar</button>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>CPF</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} style={styles.row}>
                <td style={styles.td}>{client.name}</td>
                <td style={styles.td}>{client.cpf}</td>
                <td style={styles.td}>{client.email}</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => handleEdit(client)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(client.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  row: {
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  editForm: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default ClientListPage;
