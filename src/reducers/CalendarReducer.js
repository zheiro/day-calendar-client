import { handleActions } from 'redux-actions';
import { CalendarActionTypes } from '../enums/actionTypes';

const initialState = {
	schedule: null,
};

export default handleActions({
	[CalendarActionTypes.GET_SCHEDULE]: (state, action) => {
		return {
			schedule: action.payload,
		}
	},
}, initialState);