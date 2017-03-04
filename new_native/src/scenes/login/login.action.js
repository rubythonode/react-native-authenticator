import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './login.types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { alert } from '../../app/common/alert';


export function signInAction() {
	return {
		type: AUTH_USER
	};
};

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

export function processForm({email, password}) {
	console.log('email',email);
	console.log('password',password);
	return function(dispatch) {
		fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
			body:JSON.stringify({
		    email: email,
		    password: password,
		  })
		})
		.then((response) => response.json())
		.then((responseData) => {
				  	AsyncStorage
							.setItem('token', responseData.token)
							.then(() => {
								dispatch(signInAction());
								dispatch(setAdminPrevilegeAction());
							});

						AsyncStorage.setItem('user', JSON.stringify(responseData.userData));

						Actions.home();
		})
		.catch((error) => {
					error.then(function(res){
						var errorMessage = res.errors.email ? res.errors.email : res.errors.password;
						alert(errorMessage);
					})
					// change the component state
					dispatch({type: AUTH_ERROR});
		}).done();
	}
}
