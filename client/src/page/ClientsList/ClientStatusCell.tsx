import React from 'react';
import { type Client } from './type';

interface ClientStatusCellProps {
  client: Client;
  handleAction: (client: Client, action: string) => void;
  updateClientStatus: (clientId: number, status: string) => void;
}

const ClientStatusCell: React.FC<ClientStatusCellProps> = ({
  client,
  handleAction,
  updateClientStatus,
}) => {
  return (
    <td>
      {client.status === 'В работе' ? (
        <>
          <button
            className='btn_completed'
            onClick={() => {
              handleAction(client, 'Сделка закрыта');
            }}
          >
            Закрыть сделку
          </button>
          <button
            className='btn_cancelled'
            onClick={() => {
              handleAction(client, 'Отказ');
            }}
          >
            Отказать по сделке
          </button>
        </>
      ) : client.status === 'Сделка закрыта' ? (
        <span className='completed'>Сделка закрыта</span>
      ) : client.status === 'Отказ' ? (
        <span className='cancelled'>Отказ</span>
      ) : (
        <button
          onClick={() => {
            updateClientStatus(client.id, 'В работе');
          }}
        >
          Взять сделку в работу
        </button>
      )}
    </td>
  );
};

export default ClientStatusCell;
