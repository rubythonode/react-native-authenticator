import {
  AUTH_USER,
  SET_ADMIN_PRIVILEGES,
  AUTH_ERROR,
  UNAUTH_USER,
  HTTP_PROGRESS
} from './login.types';

const INITIAL_STATE = { errors: null, authenticated: false, admin_privileges: false, profile: null, progress: false};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		 case AUTH_USER:
	      return { ...state, errors: null, authenticated: true, profile: action.payload, progress: true };
	     case SET_ADMIN_PRIVILEGES:
	      return { ...state, admin_privileges: true };
	     case AUTH_ERROR:
	      return { ...state, errors: action.errors, progress: false };
      case UNAUTH_USER:
        return { ...state, errors: null, authenticated: false, profile: null, progress: false}
      case HTTP_PROGRESS:
        return { ...state,progress: true}
	}
	return state;
};
