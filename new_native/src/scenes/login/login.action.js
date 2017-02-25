import { AUTH_USER, SET_ADMIN_PRIVILEGES, AUTH_ERROR} from './login.types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';


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

export function processForm(email, password) {
	return function(dispatch) {
		axios('http://localhost:3000/auth/login', {
			method: 'POST',
			data: {
				email,
				password
		  }
		}).then((response) => {
				if (response.status == 200) {
						// success

						AsyncStorage
							.setItem('token', response.data.token)
							.then(() => {
								dispatch(signInAction());
								dispatch(setAdminPrevilegeAction());
							});

						AsyncStorage.setItem('user', JSON.stringify(response.data.userData));

						Actions.home();

				}
		}).catch((errors) => {
					// change the component state
					dispatch({type: AUTH_ERROR});
		});
	}
}
