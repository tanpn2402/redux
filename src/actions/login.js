import {ActionTypes} from '../core/constants';

var axios = require('axios');

export function onLogin(){
  console.log('onLogin')
    return {
      type: ActionTypes.ON_LOGIN,
      message: 'onLogin',
    };
}

export function loginDone(data){
    console.log(data.mvMessage)
    return {
      type: ActionTypes.LOGIN_DONE,
      message: data.mvMessage,
    };
}

export function doLogin(username, password) {
  var url = 'http://localhost:8080/WSdemo/login/' + username + '/' + password
  var msg = ''
  
  return function (dispatch){
    //dispatch(onLogin());

    /*axios.get(url)
      .then(function (response) {
        
        dispatch(loginDone(response.data))
      })
      .catch(function (error) {
        dispatch(loginDone(error))
      }
    );*/

    axios.post('http://192.168.1.130:8080/sample/sample/helloServices/login/', {
      username: username,
      password: password
    })
    .then(function (response) {
        
        dispatch(loginDone(response.data))
      })
      .catch(function (error) {
        dispatch(loginDone(error))
      }
    );
    
  }
};
