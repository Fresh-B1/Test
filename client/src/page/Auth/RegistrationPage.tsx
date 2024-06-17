/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import type { User } from './reducer/type';
import './auth.css';
import axios from 'axios';

function RegistrationPage(): JSX.Element {
  const [fullName, setfullName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onHandleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (fullName.trim() === '' || login.trim() === '') {
        alert('заполните все обязательные поля');
        return;
      }

      const response: { message: string; user: User } = await axios.post(
        '/api/auth/registration',
        { fullName, login, password, rpassword: checkPassword }
      );
      if (response.data.message === 'success') {
        dispatch({ type: 'auth/registration', payload: response.data.user });
        navigate('/');
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-auth'>
      <h2>Заполните поля для регистрации:</h2>
      <form className='auth-form' onSubmit={onHandleSubmit}>
        <label htmlFor='fullName'>
          <input
            type='text'
            name='fullName'
            placeholder='ФИО'
            required
            value={fullName}
            onChange={(e) => {
              setfullName(e.target.value);
            }}
          />
        </label>

        <label htmlFor='login'>
          <input
            type='text'
            name='login'
            placeholder='Login'
            required
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
        </label>

        <label htmlFor='password'>
          <input
            type='password'
            name='password'
            placeholder='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <label htmlFor='password'>
          <input
            type='password'
            name='password'
            placeholder='confirm password'
            required
            value={checkPassword}
            onChange={(e) => {
              setCheckPassword(e.target.value);
            }}
          />
        </label>

        <button type='submit'>Registration</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
