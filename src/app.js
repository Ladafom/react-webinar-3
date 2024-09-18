import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart
  const totalCost = store.getTotalCost()

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddCartItem: useCallback((cartItem) => {
      store.addCartItem(cartItem);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cart={cart} totalCost={totalCost}/>
      <List
        list={list}
        onAddCartItem={callbacks.onAddCartItem}
      />
    </PageLayout>
  );
}

export default App;
