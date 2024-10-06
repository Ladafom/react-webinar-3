import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './access-routes';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile'

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */

function App() {

  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);
  const isAuth = useSelector(state=>state.session.isAuth)

  useEffect(()=>{
    if(isAuth){
      store.actions.profile.getUser();
    }
  },[isAuth])

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
