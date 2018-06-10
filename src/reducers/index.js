import { combineReducers } from 'redux';

import CalendarReducer from './CalendarReducer';
import UIReducer from './UIReducer';
import AuthReducer from './AuthReducer'

const appReducer = combineReducers({
	calendar: CalendarReducer,
	ui: UIReducer,
	auth: AuthReducer
});
const initialState = appReducer({}, {});

export default (state = initialState, action) => {

	return appReducer(state, action);
}