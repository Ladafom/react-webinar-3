import { Route, Routes } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Routes>

      <Route
        path="/"
        element={
          <>
            <Main />
            {activeModal === 'basket' && <Basket />}
          </>
        }>
      </Route>

      <Route
        path="products/:productId"
        element={
          <>
            <Product />
            {activeModal === 'basket' && <Basket />}
          </>
        }
      />
    </Routes>
  );
}

export default App;
