import StoreModule from '../module';

class Product extends StoreModule {

  initState() {
    return {
      product: {},
    };
  }

  async loadProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        product: json.result,
        order: json.result.order
      },
      'Загружен конкретный товар из АПИ',
    );
  }

  clearData(){
    this.setState(
      {
        ...this.getState(),
        product: {},
      },
      'Очистка product',
    );
  }
}

export default Product;