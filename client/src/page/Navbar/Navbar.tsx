import React from 'react';
import './navbar.css';
import axios from 'axios';

import { Link, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../redux/store';

function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);

  const logOut = async (): Promise<void> => {
    const response: { message: string } = await axios.get('/api/auth/logout');

    if (response.data.message === 'success') {
      dispatch({ type: 'auth/logout' });
    }
  };

  return (
    <nav>
      <div className='nav-wrapper' />
      <ul>
        <li className='li_nav nav_li_left'>
          <NavLink to='/'>Main</NavLink>
        </li>
        {user ? (
          <>
            <li className='li_nav nav_li_right'>
              <Link to='/' onClick={logOut}>
                Logout
              </Link>
            </li>
            <li className='nav_li_right li_hello'>Привет, {user?.fullName}</li>
          </>
        ) : (

          <li className='li_nav nav_li_right'>
            <NavLink to='/auth'>Sign-In</NavLink>
          </li>

        )}
      </ul>
      <div />
      <Outlet />
    </nav>
  );
}

export default Navbar;
