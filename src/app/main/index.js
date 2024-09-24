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
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    store.actions.catalog.load(10, skip);
  }, [skip]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPage: state.catalog.totalPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    handlePageClick: useCallback((pageNumber) => {
      setSkip(pageNumber * 10 - 10);
    }, [skip]),

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
      <Pagination
        onPageChange={callbacks.handlePageClick}
        totalPage={select.totalPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
