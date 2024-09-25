import StoreModule from '../module';

class Pagination extends StoreModule {

  initState() {
    return {
      currentPage: 1,
      skip:0,
    };
  }

  setPage(currentPage){
    this.setState(
      {
        ...this.getState(),
        currentPage: currentPage,
        skip: currentPage * 10 -10,
      },
      'Изменена страница'
    )
  }

}

export default Pagination;