import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();
  const translator = store.actions.language

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPage: state.catalog.totalPage,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.skip,
    product: state.product.product,
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

  useEffect(() => {
    store.actions.catalog.load(10, select.skip);
    if(Object.keys(select.product).length){
      store.actions.product.clearData()
    }
  }, [select.skip, select.lang]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    handlePageClick: useCallback(pageNumber => store.actions.catalog.setPage(pageNumber), [store]),

    hadleLangChange: useCallback(lang=> store.actions.language.setLanguage(lang), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item  item={item} onAdd={callbacks.addToBasket}
                      contentButton={translator.translate('buttonAdd')}
                      adress={item._id}
                      />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translator.translate('titleStore')} onLangChange={callbacks.hadleLangChange} lang={select.lang}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        basketToolContent={basketToolContent}
        homeLinkContent = {translator.translate('linkHome')}
      />
      <List list={select.list} renderItem={renders.item} />
      {
        select.totalPage &&
        <Pagination
          onPageChange={callbacks.handlePageClick} currentPage={select.currentPage} totalPage={select.totalPage}
        />
      }
    </PageLayout>
  );
}

export default memo(Main);
