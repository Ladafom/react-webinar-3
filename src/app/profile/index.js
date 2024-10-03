import React, { useEffect } from "react";
import PageLayout from "../../components/page-layout";
import AuthManager from "../../containers/auth-manager";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";

function Profile() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.profile.user,
  }));

  useInit(()=>{
    store.actions.profile.getUser();
  },[])

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthManager/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo  title={t('profile.title')} translator={t} user={select.user}/>
  </PageLayout>
  );
}

export default Profile;