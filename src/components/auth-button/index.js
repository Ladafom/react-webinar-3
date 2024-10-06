import { Link } from "react-router-dom";
import SideLayout from "../side-layout";
import { useNavigate } from "react-router-dom";
import './style.css'

function AuthButton({translator, onLogout, userName, isAuth}) {

  const navigate = useNavigate()

  function onClick(){
    onLogout()
    navigate('/');
  }

  if(!isAuth){
    return (
      <SideLayout side={'end'} padding={'mixed'} border={'bottom'}>
        <button onClick={()=>navigate('/login')}>
          {translator('auth.entrance')}
        </button>
      </SideLayout>
    );
  }

  if(isAuth){
    return (
      <SideLayout side={'end'} padding={'mixed'} border={'bottom'}>
          <Link to={'/profile'}>
            {userName}
          </Link>

        <button onClick={onClick}>
          {translator('auth.exit')}
        </button>
      </SideLayout>
    );
  }
}

export default AuthButton;