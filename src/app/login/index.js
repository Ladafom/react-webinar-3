import React, { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Auth from "../../components/auth";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import AuthManager from "../../containers/auth-manager";

function Login() {

  const store = useStore()

  const select = useSelector(state => ({
    loginError: state.session.error,
    isAuth: state.session.isAuth
  }))

  useEffect(()=>{
    if(select.loginError) {
      return store.actions.session.resetLoginErrors()
    }
  },[])

  const callbacks = {
    login: useCallback((login,password) => store.actions.session.login(login,password), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthManager/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation/>
      <Auth onLogin={callbacks.login} loginError={select.loginError} translator={t} isAuth={select.isAuth}/>
    </PageLayout>
  );
}

export default memo(Login);