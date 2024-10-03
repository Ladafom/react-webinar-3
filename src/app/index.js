import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile'
import Cookies from 'js-cookie';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
// const token = Cookies.get('token')
const PrivateRoute = ({children }) => {
  const token = Cookies.get('token')
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({children }) => {
  const token = Cookies.get('token')
  return token ? <Navigate to="/profile" /> : children;
};

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />

        <Route path={'/login'} element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
