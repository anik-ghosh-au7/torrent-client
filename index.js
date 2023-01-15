#!/usr/bin/env node
const torrentStream = require('torrent-stream');
const yargs = require('yargs');
const fs = require('fs');
const { getDate, getSpeed, getTime } = require('./util');

const argv = yargs
	.version('1.0.0')
	.usage('A light weight command-line tool to download torrent files')
	.option('a', {
		alias: 'add',
		describe: 'Add a torrent file or magnet link',
		type: 'string',
		demandOption: true,
	})
	.option('p', {
		alias: 'path',
		describe: 'Path to download the file',
		type: 'string',
		demandOption: false,
	})
	.help().argv;

let engineTimeout = null;

if (argv.add) {
	let progressCount = 0;
	const engine = torrentStream(argv.add);

	// engine.on('download', (pieceIndex) => {
	// 	console.log(`Piece ${pieceIndex || ''} has been downloaded`);
	// });

	// engine.on('upload', (pieceIndex, offset, length) => {
	// 	console.log(
	// 		`Piece ${
	// 			pieceIndex || ''
	// 		} has been uploaded with offset ${offset} and length ${length}`
	// 	);
	// });

	engine.on('idle', () => {
		if (engineTimeout) {
			clearInterval(engineTimeout);
			engineTimeout = null;
		}
		if (progressCount > 1) {
			process.stdout.clearLine(); // clear current text
			process.stdout.cursorTo(0); // move cursor to beginning of line
		}
		process.stdout.write(
			'Download in progress, please wait' +
				'.'.repeat((progressCount % 3) + 1) +
				'\t'
		);
		progressCount += 1;
		engineTimeout = setTimeout(() => {
			console.log(`\nDownload complete`);
			console.timeEnd('Time taken');
			process.exit(0);
		}, 5000);
	});

	engine.on('verifying', (pieceIndex) => {
		console.log(`Piece ${pieceIndex || ''} is being verified`);
	});

	engine.on('metadata', () => {
		console.log(`The torrent metadata has been received`);
	});

	engine.on('error', (err) => {
		console.log(`An error occurred: ${err}`);
		process.exit(0);
	});

	engine.on('ready', () => {
		console.time('Time taken');
		const folderName =
			engine.files?.length > 1
				? `${argv.path || `.`}/${getDate()}`
				: `${argv.path || `.`}`;
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
		}
		let status = 0;
		const totalLength = engine.files.reduce(
			(acc, item) => acc + item.length,
			0
		);
		// Check the status of the download
		engine.files.forEach((file) => {
			setInterval(() => {
				if (status > 0) {
					process.stdout.clearLine(); // clear current text
					process.stdout.cursorTo(0); // move cursor to beginning of line
				} else process.stdout.write('Download in progress, please wait...\n');

				const swarm = engine.swarm;
				const downloaded = swarm.downloaded;
				const downloadSpeed = swarm.downloadSpeed();
				const remainingTime = downloadSpeed
					? (totalLength - downloaded) / downloadSpeed
					: 0;
				process.stdout.write(
					`Downloaded: ${downloaded} | Uploaded: ${
						swarm.uploaded
					} | Download speed: ${getSpeed(
						downloadSpeed
					)} | Upload speed: ${getSpeed(swarm.uploadSpeed())} | Total peers: ${
						swarm.wires.length
					} | Time remaining: ${getTime(remainingTime)}\t`
				);
				status += 1;
			}, 1000);
			const outputFile = fs.createWriteStream(`${folderName}/${file.name}`);
			console.log(`Starting download: ${file.name}`);
			const stream = file.createReadStream();
			stream.pipe(outputFile);
			stream.on('error', (err) => {
				console.error('An error occurred:', err);
				process.exit(0);
			});
			outputFile.on('error', (err) => {
				console.error('An error occurred:', err);
				process.exit(0);
			});
		});
	});
}
