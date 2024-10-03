import { memo, useCallback } from "react";
import AuthButton from "../../components/auth-button";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import Cookies from "js-cookie";

function AuthManager() {

  const store = useStore()

  const select = useSelector(state => ({
    isAuth:state.profile.isAuth,
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.profile.Logout(), [store])
  };

const { t } = useTranslate();

  return (
    <AuthButton translator={t} onLogout={callbacks.logout}/>
  );
}

export default memo(AuthManager);