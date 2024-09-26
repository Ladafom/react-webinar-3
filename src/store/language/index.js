import StoreModule from '../module';
import { en, ru } from './vocabulary';

class Language extends StoreModule {

  initState() {
    return {
      lang: 'en',
    };
  }

  setLanguage(lang){
    this.setState(
      {
        ...this.getState(),
        lang: lang
      },
      'Изменен язык'
    )
  }

  translate(phrase){
    if(this.getState().lang === 'ru'){
      return ru[phrase]
    } else {
      return en[phrase]
    }
  }

}

export default Language;