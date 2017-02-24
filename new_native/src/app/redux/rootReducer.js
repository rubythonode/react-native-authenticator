import { combineReducers } from 'redux';
import LoginReducer from '../../scenes/login/login.reducer';
import SignupReducer from '../../scenes/signup/signup.reducer';

const rootReducer = combineReducers({
	login: LoginReducer,
	signup:  SignupReducer
});

export default rootReducer;
