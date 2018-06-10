import { CalendarService } from '../services';
import { CalendarActionTypes } from '../enums/actionTypes';
import { UIActions } from '.';
import Paths from '../enums/Paths';


export default {

	getSchedule() {
		return async dispatch => {
			try {
				dispatch(UIActions.showSpinner());
				let userId = sessionStorage.getItem('@@mc/USERID')
				let request = await CalendarService.getSchedule(userId);
				dispatch(UIActions.hideSpinner());
				dispatch({
					type: CalendarActionTypes.GET_SCHEDULE,
					payload: request.data
				});
				return request.data;
			} catch (err) {
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Could not get schedule', err.message));
			}
		};
	},

	updateActivity(activity) {
		return async dispatch => {
			try {
				dispatch(UIActions.showSpinner());
				let request = await CalendarService.updateActivity(activity);
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Update Activity', 'Activity has been successfully updated', Paths.BASE));
			} catch (err) {
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Could not update activity', err.message));
			}
		};
	},

	addActivity(activity) {
		return async dispatch => {
			try {
				dispatch(UIActions.showSpinner());
				let request = await CalendarService.addActivity(activity);
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Added Activity', 'Activity has been successfully added', Paths.BASE));
			} catch (err) {
				dispatch(UIActions.hideSpinner());
				dispatch(UIActions.showMessageBox('Could not add activity', err.message));
			}
		};
	},
};