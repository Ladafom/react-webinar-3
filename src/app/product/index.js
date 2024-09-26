import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import useStore from "../../store/use-store";
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ProductInfo from '../../components/product-info';

function Product() {

  const store = useStore();
  const { productId } = useParams();
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    if(activeModal){
      store.actions.modals.close()
    }
    store.actions.product.loadProduct(productId)
  }, [productId]);

  const select = useSelector(state => ({
    product: state.product.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    hadleLangChange: useCallback(lang=> store.actions.language.setLanguage(lang), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product.title} onLangChange={callbacks.hadleLangChange}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductInfo product={select.product} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default React.memo(Product);