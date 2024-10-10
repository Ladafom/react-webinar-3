import { useState, useEffect, useMemo }  from 'react'
import useServices from "./use-services";
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const {I18n} = useServices();

  const [lang, setLangState] = useState(I18n.lang);

  const unsubscribe = useMemo(() => {
    return I18n.subscribe(() => {
      const newState = I18n.lang;
      setLangState(prevState => (shallowequal(prevState, newState) ? prevState : newState));
    });
  }, []);

  useEffect(()=>{
    unsubscribe
  },[unsubscribe])

  const t = (text,number) => {
    return I18n.translate(text,number)
  }

  const setLang = (newLang) => {
    return I18n.setLang(newLang)
  }

  return {t, setLang, lang}

}