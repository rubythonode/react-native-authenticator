import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR, HTTP_PROGRESS} from './login.types';
import axios from 'axios';
import { AUTH } from '../../app/common/enums';
import { asyncStorage, authErrorBuilder, loginWithFacebook} from '../../app/common/helper';


export function signInAction(payload) {
	return {
		type: AUTH_USER,
		payload
	};
};

export function httpProgress(){
	return {
		type: HTTP_PROGRESS
	}
}

export function setAdminPrevilegeAction() {
	return {
		type: SET_ADMIN_PRIVILEGES
	};
};

export function signInErrorAction(errors) {
	return {
		type: AUTH_ERROR,
		errors
	};
};
const successLogin = (responseData, dispatch) =>{
	AsyncStorage
		.setItem('token', responseData.token)
		.then(() => {
			dispatch(signInAction());
			dispatch(setAdminPrevilegeAction());
		});

	AsyncStorage.setItem('user', JSON.stringify(responseData.userData));

	Actions.home();
}
export function processForm({email, password}) {
	return function(dispatch) {
		fetch(AUTH.LOGIN, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
			body: JSON.stringify({
		    email: email,
		    password: password,
		  })
		})
		.then((response) => response.json())
		.then((responseData) => {
				 asyncStorage(responseData, dispatch);
		})
		.catch((error) => {
				authErrorBuilder(error, dispatch);
		}).done();
	};
};

// export function processFacebookLogin(profileInfo){
// 	return function(dispatch){
// 		fetch(AUTH.FACEBOOK, {
// 			method: 'POST',
// 			headers: {
// 		    'Accept': 'application/json',
// 		    'Content-Type': 'application/json',
// 		  },
// 			body: JSON.stringify(profileInfo)
// 		})
// 		.then((response) => response.json())
// 		.then((responseData) =>{
// 			asyncStorage(responseData, dispatch);
// 		})
// 	}
// }

export  function facebookLogin(){
	return function(dispatch){
		dispatch({type: HTTP_PROGRESS})
		loginWithFacebook()
			.then((result) =>{
				let user = {
          name: result.user.name,
          email: result.user.email,
          social: {
            facebook: {
              id: result.user.id,
              token: result.accessToken
            }
          }
        }
				fetch(AUTH.FACEBOOK, {
					method: 'POST',
					headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				  },
					body: JSON.stringify(user)
				})
				.then((response) => response.json())
				.then((responseData) =>{
					asyncStorage(responseData, dispatch);
				})
			})
	}
}
