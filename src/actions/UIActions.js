import { createAction } from 'redux-actions';
import { UIActionTypes } from '../enums/actionTypes';


export default {

	showSpinner: createAction(UIActionTypes.SHOW_SPINNER),

	hideSpinner: createAction(UIActionTypes.HIDE_SPINNER),

	showMessageBox(title, message, redirect) {
		return {
			type: UIActionTypes.SHOW_MESSAGEBOX,
			payload: { title, message, redirect }
		}
	},

	hideMessageBox: createAction(UIActionTypes.HIDE_MESSAGEBOX),

	setRedirectLink(link) {
		return {
			type: UIActionTypes.SET_REDIRECT_LINK,
			payload: link
		}
	},

	removeRedirectLink: createAction(UIActionTypes.REMOVE_REDIRECT_LINK),

};