import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import axios from 'axios';
import MainPage from '../page/Main/MainPage';
import Navbar from '../page/Navbar/Navbar';
import RegistrationPage from '../page/Auth/RegistrationPage';
import AuthorizationPage from '../page/Auth/AuthorizationPage';
import type { User } from '../page/Auth/reducer/type';
import '../app/styles/index.css';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const checkUser = async (): Promise<void> => {
    const response: { message: string; user: User } =
      await axios.get('api/auth/check');

    if (response.data.message === 'success') {
      dispatch({ type: 'auth/userCheck', payload: response.data.user });
    }
  };

  useEffect(() => {
    checkUser().catch(console.log);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/auth' element={<AuthorizationPage />} />
      </Routes>
    </>
  );
}

export default App;
