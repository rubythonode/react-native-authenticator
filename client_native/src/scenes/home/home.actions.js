import { UNAUTH_USER } from './home.types';

export function signOutAction() {
	return {
		type: UNAUTH_USER
	};
};