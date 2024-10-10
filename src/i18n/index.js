import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = this.config.i18n.baseLang;
    this.listeners = [];
  }

  translate (text, plural) {
    let result = translations[this.lang] && text in translations[this.lang] ? translations[this.lang][text] : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang (newLang) {
    this.lang = newLang
    this.services.api.setHeader(this.config.store.modules.session.langHeader, this.lang);
    for (const listener of this.listeners) listener(this.lang);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

}

export default I18nService;
