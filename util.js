module.exports = {
	getDate: () => {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();

		today = mm + '-' + dd + '-' + yyyy;
		return today;
	},
	getSpeed: (speed) => {
		if (speed < 1000) return `${speed} KB/s`;
		else if (speed < 1000000) return `${(speed / 1000).toFixed(2)} MB/s`;
		else return `${(speed / 1000000).toFixed(2)} GB/s`;
	},
};
