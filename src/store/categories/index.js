import StoreModule from '../module';
import { sortCategories } from '../../utils';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories:[],
    };
  }

  async getCategories(){

    try{
      const response = await fetch(`/api/v1/categories?fields=_id,name,title,parent(_id)&limit=*&sort=parent,parent._id`);
      const json = await response.json();
      const sortedCategories = sortCategories(json.result.items)

      this.setState(
        {
          ...this.getState(),
          categories: sortedCategories,
        },
        'Загружен список категорий',
      );
    } catch (error){
      this.setState(
        {
          categories:[],
        },
        'Ошибка загрузки списка категорий',
      );
    }

  }
}

export default CategoriesState;
