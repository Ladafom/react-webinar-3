import { Link } from "react-router-dom";
import SideLayout from "../side-layout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './style.css'

function AuthButton({translator, onLogout}) {

  const userName = Cookies.get('userName')
  const token = Cookies.get('token')
  const navigate = useNavigate()

  function onClick(){
    onLogout()
    navigate('/')
  }

  if(!token){
    return (
      <SideLayout side={'end'} padding={'medium'}>
        <button>
          <Link to={'/login'} className="Auth">
            {translator('auth.entrance')}
          </Link>
        </button>
      </SideLayout>
    );
  }

  if(token){
    return (
      <SideLayout side={'end'} padding={'medium'}>
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