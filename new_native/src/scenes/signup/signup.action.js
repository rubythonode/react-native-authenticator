import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './signup.types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
const api = 'http://localhost:3000/auth/signup';

export function processSignupForm(name, email, password){
  return function(dispatch){
    fetch(api, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
			body:JSON.stringify({
        name: name,
		    email: email,
		    password: password
		  })
		})
    .then((response) => response.json())
		.then((responseData) =>{
      AsyncStorage
        .setItem('token', responseData.token)
        .then(() => {
          dispatch({type: AUTH_USER});
          dispatch({type: SET_ADMIN_PRIVILEGES});
        });

      AsyncStorage.setItem('user', JSON.stringify(responseData.userData));
      Actions.home();
      
    })
    .catch((error) =>{

    })
  }
}
