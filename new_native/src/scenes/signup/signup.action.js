import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './signup.types';
import axios from 'axios';
import { AUTH } from '../../app/common/enums';
import { asyncStorage, authErrorBuilder } from '../../app/common/helper';


export function processSignupForm(obj){
  return function(dispatch){
    fetch(AUTH.SIGNUP, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
			body: JSON.stringify(obj)
		})
    .then((response) => response.json())
		.then((responseData) =>{
      asyncStorage(responseData, dispatch);
    })
    .catch((error) => {
      authErrorBuilder(error, dispatch);
    })
  }
}
