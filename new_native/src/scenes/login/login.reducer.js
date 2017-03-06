import {
  AUTH_USER,
  SET_ADMIN_PRIVILEGES,
  AUTH_ERROR
} from './login.types';

const INITIAL_STATE = { errors: null, authenticated: false, admin_privileges: false, profile: null };

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		 case AUTH_USER:
        console.log(action);
	      return { ...state, errors: null, authenticated: true, profile: action.payload };
	     case SET_ADMIN_PRIVILEGES:
	      return { ...state, admin_privileges: true };
	     case AUTH_ERROR:
	      return { ...state, errors: action.errors };
	}
	return state;
};
