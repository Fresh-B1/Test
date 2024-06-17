import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import axios from 'axios';
import ModalWindow from '../ui/modal/ModalWindow';
import ClientStatusCell from './ClientStatusCell';
import type { Client, RootState } from './type';
import './clientsList.css';

const ClientsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [action, setAction] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const updateClientStatus = async (clientId: number, status: string) => {
    try {
      const response = await axios.patch(`/api/clients/update/${clientId}`, { status });

      if (response.data.message === 'success') {
        dispatch({
          type: 'client/updateStatus',
          payload: response.data.clients,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAction = (client: Client, action: string) => {
    setCurrentClient(client);
    setAction(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (currentClient) {
      await updateClientStatus(currentClient.id, action);
    }
    setShowModal(false);
    setCurrentClient(null);
    setAction('');
  };

  const cancelAction = () => {
    setShowModal(false);
    setCurrentClient(null);
    setAction('');
  };

  const listOfClients = clients
    .sort((a, b) => a.id - b.id)
    .map((client) => {
      const birthday = new Date(client.birthday);
      return (
        <tr key={client.id}>
          <td>{client.accountNumber}</td>
          <td>{client.surname}</td>
          <td>{client.name}</td>
          <td>{client.patronymic}</td>
          <td>{birthday.toLocaleDateString('ru-RU')}</td>
          <td>{client.INN}</td>
          <ClientStatusCell
            client={client}
            handleAction={handleAction}
            updateClientStatus={updateClientStatus}
          />
        </tr>
      );
    });

  return (
    <div style={{ width: '60%' }}>
      <table>
        <thead>
          <tr>
            <th>Номер счета</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Дата рождения</th>
            <th>ИНН</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>{listOfClients}</tbody>
      </table>
      {showModal && (
        <ModalWindow
          action={action}
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};

export default ClientsList;
