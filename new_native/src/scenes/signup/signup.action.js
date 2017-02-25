import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './signup.types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
const api = 'http://localhost:3000/auth/signup';

export function processSignupForm(name, email, password){
  return function(dispatch){
    axios.post(api,{
      name,
      email,
      password
    })
    .then(function(response){
      if (response.status == 200) {

          AsyncStorage
            .setItem('token', response.data.token)
            .then(() => {
              dispatch({type: AUTH_USER});
              dispatch({type: SET_ADMIN_PRIVILEGES});
            });

          AsyncStorage.setItem('user', JSON.stringify(response.data.userData));

          Actions.home();

      }
    })
    .catch(function(errors){
      console.log(errors);
    })
  }
}
