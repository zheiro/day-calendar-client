import { AuthService } from '../services';
import { AuthActionTypes } from '../enums/actionTypes';
import { UIActions } from '.';
import { Paths } from '../enums';


export default {

	login(email, password) {
		return async dispatch => {
			try {
				dispatch(UIActions.showSpinner());
				let request = await AuthService.login(email, password);
				dispatch(UIActions.hideSpinner());
				sessionStorage.setItem('@@mc/USERID', request.data.userId)
				dispatch({
					type: AuthActionTypes.LOGIN,
					payload: request.data
				});
			} catch (err) {
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Login Error', err.message));
			}
		};
	},

	register(email, password) {
		return async dispatch => {
			try {
				dispatch(UIActions.showSpinner());
				let request = await AuthService.register(email, password);
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Registration Success', 'Please login using your credentials', Paths.BASE));
			} catch (err) {
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Registration Error', 'Please try a different email'));
			}
		};
	},
};