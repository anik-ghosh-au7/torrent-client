module.exports = {
	getDate: () => {
		let today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0');
		const yyyy = today.getFullYear();

		today = mm + '-' + dd + '-' + yyyy;
		return today;
	},
	getSpeed: (speed) => {
		if (speed < 1000) return `${speed} KB/s`;
		else if (speed < 1000000) return `${(speed / 1000).toFixed(2)} MB/s`;
		else return `${(speed / 1000000).toFixed(2)} GB/s`;
	},
	getTime: (seconds) => {
		if (!seconds || isNaN(seconds)) return '0';
		seconds = Number(seconds);
		const d = Math.floor(seconds / (3600 * 24));
		const h = Math.floor((seconds % (3600 * 24)) / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = Math.floor(seconds % 60);

		if (d > 100) {
			return 'infinity';
		} else if (d > 0) {
			return d + (d == 1 ? ' day' : ' days');
		} else if (h > 0) {
			return h + ':' + m + (h == 1 ? ' hour' : ' hours');
		} else if (m > 0) {
			return m + ':' + s + (m == 1 ? ' minute' : ' minutes');
		} else {
			return s + (s == 1 ? ' second' : ' seconds');
		}
	},
};
