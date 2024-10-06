import { useState } from "react";
import SideLayout from "../side-layout";
import './style.css'

function Auth(props) {

  const [loginForm, SetLoginForm] = useState({
    login:'',
    password:''
  })

  function onFormChange(event){
    SetLoginForm(
      {
        ...loginForm,
        [event.target.name]: event.target.value
      }
    )
  }

  function onClick(event){
    event.preventDefault()
    SetLoginForm(
      {
        login:'',
        password:''
      }
    )
    props.onLogin(loginForm.login, loginForm.password)
  }

  return (
    <SideLayout padding={'medium'} direction={'column'} side={'start'}>
      <h2>
        {props.translator('login.title')}
      </h2>
      <form className="Auth-form">
        <label>{props.translator('login.login')}</label>
        <input
          className="Auth-input"
          name="login"
          value={loginForm.login}
          onChange={onFormChange}
        />
        <label>{props.translator('login.password')}</label>
        <input
          className="Auth-input"
          name="password"
          value={loginForm.password}
          type="password"
          onChange={onFormChange}
        />
        <p className="Auth-error">
          {props.loginError}
        </p>
        <button
          onClick={onClick}
        >
          {props.translator('login.entrance')}
        </button>
      </form>
    </SideLayout>
  );
}

export default Auth;