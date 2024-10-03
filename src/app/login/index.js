import React, { memo, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import AuthButton from "../../components/auth-button";
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
    loginError: state.profile.error,
  }))

  const callbacks = {
    login: useCallback((login,password) => store.actions.profile.Login(login,password), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthManager/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation/>
      <Auth onLogin={callbacks.login} loginError={select.loginError} translator={t}/>
    </PageLayout>
  );
}

export default memo(Login);