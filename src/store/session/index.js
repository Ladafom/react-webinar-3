import StoreModule from '../module';
class SessionState extends StoreModule {

  initState() {
    return {
      error:[],
      isAuth:Boolean(localStorage.getItem('token')),
    };
  }

  async login(login, password){

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
        error:json.error.data.issues,
        isAuth:false,
      },
        'Ошибка входа',
      );
    } else {
      localStorage.setItem('token', json.result.token)
      this.setState({
        ...this.getState(),
        error:[],
        isAuth:true,
      },
        'Успешный вход',
      );
    }
  }

  async logout(){

      await fetch('/api/v1/users/self?fields=*', {
        method: 'DELETE',
        headers:{
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })

      this.setState({
        ...this.getState(),
        isAuth: false,
      },
        'Успешный выход'
      )

      localStorage.removeItem("token");
  }

  resetLoginErrors(){
    this.setState({
      ...this.getState(),
      error:[],
    },
      'Сброс ошибок данных авторизации',
    )
  }

}

export default SessionState;
