import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { alert } from './alert';
import { signInErrorAction, setAdminPrevilegeAction,  signInAction} from '../../scenes/login/login.action';

export function asyncStorage(responseData, dispatch){
  AsyncStorage
		.setItem('token', responseData.token)
		.then(() => {
			dispatch(signInAction());
			dispatch(setAdminPrevilegeAction());
		});

	AsyncStorage.setItem('user', JSON.stringify(responseData.userData));

	Actions.home();

}

export  function authErrorBuilder(error, dispatch){
  error.then((res) =>{
    var message;
    if (res.errors.password){
      message = res.errors.password;
    }
    if (res.errors.name){
      message = res.errors.name;
    }
    if (res.errors.email){
      message = res.errors.email;
    }
    dispatch(signInErrorAction(message));
    alert(message);
  })
}
