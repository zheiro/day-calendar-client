const googleMapsConfig = {
	key: 'AIzaSyBhd_pjXFUEkVXdqH0rCZDnSzCGnVEpYfw'
};

const APIConfig = {
	development: {
		uri: 'localhost:5050/api',
		googleMaps: googleMapsConfig //need to remove this
	},
	staging: {
		uri: 'localhost:5050/api',
		googleMaps: googleMapsConfig
	},
	production: {
		uri: 'localhost:5050/api',
		googleMaps: googleMapsConfig
	}
};

export default APIConfig;