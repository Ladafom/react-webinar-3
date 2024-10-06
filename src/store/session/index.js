import StoreModule from '../module';
class SessionState extends StoreModule {

  initState() {
    return {
      error:'',
      isAuth:Boolean(localStorage.getItem('token')),
      userName:localStorage.getItem('userName') || ''
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
        error:json.error.message,
        isAuth:false,
        userName:''
      },
        'Ошибка входа',
      );
    } else {
      localStorage.setItem('token', json.result.token)
      localStorage.setItem('userName', json.result.user.profile.name)
      this.setState({
        ...this.getState(),
        error:'',
        isAuth:true,
        userName: localStorage.getItem('userName')
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
        userName:''
      },
        'Успешный выход'
      )

      localStorage.removeItem("token");
      localStorage.removeItem("userName");
  }

  resetLoginErrors(){
    this.setState({
      ...this.getState(),
      error:'',
    },
      'Сброс ошибок данных авторизации',
    )
  }

}

export default SessionState;
