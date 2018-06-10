import { handleActions } from 'redux-actions';
import { AuthActionTypes } from '../enums/actionTypes';

const initialState = {
	auth: null,
};

export default handleActions({
	[AuthActionTypes.LOGIN]: (state, action) => {
		return {
			auth: action.payload,
		}
	},
}, initialState);