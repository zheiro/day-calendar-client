export default {

	formatNumber(value, decimalPlaces = 0, grouping = true) {
		const formattedValue = value.toFixed(decimalPlaces);
		if (grouping) {
			return formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		} else {
			return formattedValue;
		}
	}

};