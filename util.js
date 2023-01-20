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
		if (speed < 1048576) return `${speed / 1024} KB/s`;
		else if (speed < 1073741824) return `${(speed / 1048576).toFixed(2)} MB/s`;
		else return `${(speed / 1073741824).toFixed(2)} GB/s`;
	},
	getTime: (seconds) => {
		if (!seconds || isNaN(seconds)) return '0';
		seconds = Number(seconds);
		const d = Math.floor(seconds / (3600 * 24));
		const h = Math.floor((seconds % (3600 * 24)) / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = Math.floor(seconds % 60);

		if (d > 365) {
			return 'infinity';
		}

		const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
		const hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : ' hrs, ') : '';
		const mDisplay = m > 0 ? m + (m == 1 ? ' min, ' : ' mins, ') : '';
		const sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' secs') : '';
		const remainingTime = dDisplay + hDisplay + mDisplay + sDisplay;
		return remainingTime && remainingTime !== '' ? remainingTime : '0 sec';
	},
};
