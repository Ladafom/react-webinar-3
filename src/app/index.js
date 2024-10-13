import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../containers/protected';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const select = useSelector(
    state => ({
      exists: state.session.exists,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const store = useStore();
  useInit(async () => {
    if(!select.exists)
    await store.actions.session.remind();
  },[select.exists]);

  const activeModal = useSelectorRedux(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={ <Login />}/>
        <Route
          path={'/profile'}
          element={
            <Protected redirect="/login">
              <Profile />
            </Protected>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
