import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      skip: 0,
    };
  }

  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPage: Math.ceil(json.result.count / 10),
      },
      'Загружены товары из АПИ',
    );
  }

  setPage(currentPage){
    this.setState(
      {
        ...this.getState(),
        currentPage: currentPage,
        skip: currentPage * 10 - 10,
      },
      'Изменена страница'
    )
  }
}

export default Catalog;
