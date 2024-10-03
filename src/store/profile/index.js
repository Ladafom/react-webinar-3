import StoreModule from '../module';
import Cookies from 'js-cookie';

class ProfileState extends StoreModule {

  initState() {
    return {
      error:'',
      isAuth:Boolean(Cookies.get('token')),
      user:{}
    };
  }

  async Login(login, password){

    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "login": login,
          "password": password
        }
      ),
    });
    const json = await response.json();

    if(json.error){
      this.setState({
        ...this.getState(),
        error:json.error.message,
        isAuth:false
      },
        'Ошибка входа',
      );
    } else {
      Cookies.set('userName', json.result.user.profile.name)
      this.setState({
        ...this.getState(),
        error:'',
        isAuth:true,
      },
        'Успешный вход',
      );
    }
  }

  async Logout(){

      await fetch('/api/v1/users/self?fields=*', {
        method: 'DELETE',
        headers:{
          'X-Token': Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      })

      this.setState({
        ...this.getState(),
        isAuth: false
      },
        'Успешный выход'
      )

      Cookies.remove("token");
      Cookies.remove("userName");
  }

  async getUser(){
    const response = await fetch('/api/v1/users/self?fields=*',{
      headers:{
        'X-Token': Cookies.get('token'),
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
    this.setState({
      user:json.result
    },
      'Получение данных пользователя из АПИ',
    );
  }
}

export default ProfileState;
