import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import type { User } from './reducer/type';
import axios from 'axios';
import './auth.css';

function AuthorizationPage(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (login.trim() === '' || password.trim() === '') {
        alert('заполните все обязательные поля');
        return;
      }

      const response: { message: string; user: User } = await axios.post(
        '/api/auth/authorization',
        { login, password }
      );

      if (response.data.message === 'success') {
        dispatch({ type: 'auth/login', payload: response.data.user });
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-auth'>
      <h2>Введите данные учтеной записи:</h2>
      <form className='auth-form' onSubmit={onHandleSubmit}>
        <label htmlFor='login'>
          <input
            type='text'
            name='login'
            placeholder='login'
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
        </label>

        <label htmlFor='login'>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <Link className='no-link-style' to='/registration'>
          Sign-Up
        </Link>

        <button className='btn-btn' type='submit'>
          Continue
        </button>
      </form>
    </div>
  );
}

export default AuthorizationPage;
