import { memo, useCallback } from "react";
import AuthButton from "../../components/auth-button";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";

function AuthManager() {

  const store = useStore()

  const select = useSelector(state => ({
    isAuth:state.session.isAuth,
    userName: state.profile.user?.profile?.name
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.session.logout(), [store])
  };

const { t } = useTranslate();

  return (
    <AuthButton translator={t} onLogout={callbacks.logout} isAuth={select.isAuth} userName={select.userName}/>
  );
}

export default memo(AuthManager);