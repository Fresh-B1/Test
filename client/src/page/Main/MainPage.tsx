import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import axios from 'axios';
import './mainPage.css';
import ClientsList from '../ClientsList/ClientsList';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);

  async function getClients() {
    try {
      const response = await axios.get('/api/clients/load');

      if (response.data.message === 'success') {
        dispatch({ type: 'clients/load', payload: response.data.clients });
      }
    } catch (error) {
      console.error('Ошибка:', error.response.data.error);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className='MainPage'>
      {user ? (
        <>
          <h1>Список клиентов для отработки</h1>
          <ClientsList />
        </>
      ) : (
        <h1>Пожалуйста, войди в свой акканут (login: jack / pass: 123)</h1>
      )}
    </div>
  );
}

export default MainPage;
