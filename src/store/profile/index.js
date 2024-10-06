import StoreModule from '../module';
class ProfileState extends StoreModule {

  initState() {
    return {
      user:{},
    };
  }

  async getUser(){
    const response = await fetch('/api/v1/users/self?fields=*',{
      headers:{
        'X-Token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
    this.setState({
      ...this.getState(),
      user:json.result
    },
      'Получение данных пользователя из АПИ',
    );
  }
}

export default ProfileState;
