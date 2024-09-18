import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart'
import CartModal from './components/cartModal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart
  const totalCost = store.getTotalCost()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const callbacks = {
    onDeleteCartItem: useCallback((cartItem) => {
      store.deleteCartItem(cartItem);
    },[store]),

    onAddCartItem: useCallback((cartItem) => {
      store.addCartItem(cartItem);
    }, [store]),

    onModalOpen: useCallback(()=>{
      setIsModalOpen(true)
    }, [isModalOpen]),

    onModalClose: useCallback(()=>{
      setIsModalOpen(false)
    }, [isModalOpen])
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        cartLength={cart.length}
        totalCost={totalCost}
        onControlsClick={callbacks.onModalOpen}
      />
      <List
        list={list}
        onControlsClick={callbacks.onAddCartItem}
        controlsType='add'
      />
      <CartModal
        cart={cart}
        totalCost={totalCost}
        onControlsClick={callbacks.onDeleteCartItem}
        onModalClose={callbacks.onModalClose}
        isModalOpen={isModalOpen}
      />
    </PageLayout>
  );
}

export default App;
