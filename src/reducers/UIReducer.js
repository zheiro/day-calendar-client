import { handleActions } from 'redux-actions';
import { UIActionTypes } from '../enums/actionTypes';

const initialState = {
	spinner: {
		active: false
	},
	messageBox: {
		open: false,
		title: '',
		message: ''
	},
};

export default handleActions({
	[UIActionTypes.SHOW_MESSAGEBOX]: (state, action) => {
		return {
			...state,
			messageBox: {
				open: true,
				title: action.payload.title,
				message: action.payload.message,
				redirect: action.payload.redirect,
			}
		}
	},

	[UIActionTypes.HIDE_MESSAGEBOX]: state => {
		return {
			...state,
			messageBox: { ...initialState.promptSelectBox }
		}
	},

	[UIActionTypes.SHOW_SPINNER]: (state, action) => {
		return {
			...state,
			spinner: {
				active: true
			}
		}
	},

	[UIActionTypes.HIDE_SPINNER]: state => {
		return {
			...state,
			spinner: {
				active: false
			}
		}
	},

	[UIActionTypes.SET_REDIRECT_LINK]: (state, action) => {
		return {
			...state,
			redirectLink: action.payload
		}
	},

	[UIActionTypes.REMOVE_REDIRECT_LINK]: (state, action) => {
		return {
			...state,
			redirectLink: null
		}
	}

}, initialState);