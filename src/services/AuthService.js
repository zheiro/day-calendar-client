import axios from 'axios';

class AuthService {

	static async login(email, password) {
		try {
			let request = await axios.post(`http://localhost:5050/api/auth/login`, { email, password })
			return request;
		} catch (err) {
			if (err.response && err.response.data.message) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error('Could not log you in. Please try again later.')
			}
		}
	}

	static async register(email, password) {
		try {
			let request = await axios.post(`http://localhost:5050/api/auth/register`, { email, password })
			return request;
		} catch (err) {
			if (err.response && err.response.data.message) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error('Could not sign you up. Please try again later.')
			}
		}
	}
}

export default AuthService;