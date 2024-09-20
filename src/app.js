import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart'
import CartModal from './components/cart-modal';
import Modal from './components/modal';

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
    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    },[store]),

    onAddCartItem: useCallback((code) => {
      store.addCartItem(code);
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
        isCart={false}
      />
      <Modal
        modalHeader={'Корзина'}
        onModalClose={callbacks.onModalClose}
        isModalOpen={isModalOpen}
        >
        <CartModal
          cart={cart}
          totalCost={totalCost}
          onControlsClick={callbacks.onDeleteCartItem}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
