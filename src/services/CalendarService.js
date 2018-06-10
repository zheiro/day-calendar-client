import axios from 'axios';

class CalendarService {

	static async getSchedule(userId) {
		try {
			let request = await axios.get(`http://localhost:5050/api/calendar/${userId}`)
			return request;
		} catch (err) {
			if (err.response && err.response.data.message) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error('Could not retrieve schedule. Please try again later.')
			}
		}
	}

	static async updateActivity(activity) {
		activity.duration = parseInt(activity.duration)
		try {
			let request = await axios.post(`http://localhost:5050/api/calendar/edit/${parseInt(activity.calendarId)}`, { ...activity })
			return request;
		} catch (err) {
			if (err.response && err.response.data.message) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error('Could not retrieve schedule. Please try again later.')
			}
		}
	}

	static async addActivity(activity) {
		activity.duration = parseInt(activity.duration)
		activity.userId = parseInt(sessionStorage.getItem('@@mc/USERID'))
		try {
			let request = await axios.post(`http://localhost:5050/api/calendar/add/${activity.userId}`, { ...activity })
			return request;
		} catch (err) {
			if (err.response && err.response.data.message) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error('Could not retrieve schedule. Please try again later.')
			}
		}
	}

}

export default CalendarService;