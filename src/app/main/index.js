import { memo, useCallback, useEffect , useState} from 'react';
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

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPage: state.catalog.totalPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.pagination.skip,
    product: state.product.product,
  }));

  useEffect(() => {
    store.actions.catalog.load(10, select.skip);
    if(Object.keys(select.product).length){
      store.actions.product.clearData()
    }
  }, [select.skip]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    handlePageClick: useCallback(pageNumber => store.actions.pagination.setPage(pageNumber), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      {
        select.totalPage &&
        <Pagination
          onPageChange={callbacks.handlePageClick}
        />
      }
    </PageLayout>
  );
}

export default memo(Main);
