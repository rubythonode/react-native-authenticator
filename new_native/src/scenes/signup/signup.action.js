import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './signup.types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
const api = 'http://localhost:3000/auth/signup';

export function processForm(name, email, password){
  console.log(name, email, password);
  return function(dispatch){
    axios(api,{
			method: 'POST',
			data: {
				name,
				email,
        password
		  }
		})
      .then(response =>{
        console.log(response);
      })
      .catch(errors =>{
        console.log(errors);
      })
  }
}
