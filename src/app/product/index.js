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
  const translator = store.actions.language

  const { productId } = useParams();
  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    product: state.product.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang,
  }));

  const basketToolContent = {
    inCart: translator.translate('inCart'),
    oneItem: translator.translate('oneItem'),
    fewItems: translator.translate('fewItems'),
    manyItems: translator.translate('manyItems'),
    cartEmpty: translator.translate('cartEmpty'),
    buttonToCart: translator.translate('buttonToCart'),
  }

  const productInfoContent = {
    productManufacture: translator.translate('productManufacture'),
    productCategory: translator.translate('productCategory'),
    productRelease: translator.translate('productRelease'),
    productPrice: translator.translate('productPrice'),
    buttonAdd: translator.translate('buttonAdd'),
  }

  useEffect(() => {
    if(activeModal){
      store.actions.modals.close()
    }
    store.actions.product.loadProduct(productId)
  }, [productId]);

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    hadleLangChange: useCallback(lang=> store.actions.language.setLanguage(lang), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product.title} onLangChange={callbacks.hadleLangChange} lang={select.lang}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        basketToolContent={basketToolContent}
        homeLinkContent = {translator.translate('linkHome')}
      />
      <ProductInfo
        product={select.product}
        onAdd={callbacks.addToBasket}
        productInfoContent={productInfoContent}
      />
    </PageLayout>
  );
}

export default React.memo(Product);