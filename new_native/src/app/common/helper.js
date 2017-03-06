import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { alert } from './alert';
import { signInErrorAction, setAdminPrevilegeAction,  signInAction} from '../../scenes/login/login.action';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';

export function asyncStorage(responseData, dispatch){
  AsyncStorage
		.setItem('token', responseData.token)
		.then(() => {
			dispatch(signInAction(responseData.userData));
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

export function handleFacebookLogout(dispatch){
  LoginManager.logOut();
}

const getFacebookAccessToken = () =>{
  return new Promise((resolve, reject) =>{
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      resolve(data.accessToken);
    })
  })

}
const facebookResponseHandler = (accessToken) =>{
  return new Promise((resolve, reject) =>{
    const responseInfoCallback = (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name'
          }
        }
      },
      responseInfoCallback
    );
    return new GraphRequestManager().addRequest(infoRequest).start()
  })

}
export async function loginWithFacebook(){
  const data = await LoginManager.logInWithPublishPermissions();
  let accessToken = await getFacebookAccessToken();
  const fbResponse = await facebookResponseHandler(accessToken);
  return {user: fbResponse, accessToken};
}
