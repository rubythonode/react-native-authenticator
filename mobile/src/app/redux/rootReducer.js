import { combineReducers } from 'redux';
import LoginReducer from '../../scenes/login/login.reducer';
import FormReducer from '../../scenes/form-config/form-config.reducer';


const rootReducer = combineReducers({
	login: LoginReducer,
	form: FormReducer
});

export default rootReducer;
