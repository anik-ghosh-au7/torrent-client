#!/usr/bin/env node
const torrentStream = require('torrent-stream');
const yargs = require('yargs');
const fs = require('fs');
const getDate = require('./util');

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
	const engine = torrentStream(argv.add);

	engine.on('download', (pieceIndex) => {
		console.log(`Piece ${pieceIndex || ''} has been downloaded`);
	});

	engine.on('upload', (pieceIndex, offset, length) => {
		console.log(
			`Piece ${
				pieceIndex || ''
			} has been uploaded with offset ${offset} and length ${length}`
		);
	});

	engine.on('idle', () => {
		if (engineTimeout) {
			clearInterval(engineTimeout);
			engineTimeout = null;
		}
		console.log('Download in progress, please wait');
		engineTimeout = setTimeout(() => {
			console.log(`Download complete`);
			console.timeEnd('Time taken:');
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
		console.time('Time taken:');
		const folderName =
			engine.files?.length > 1
				? `${argv.path || `.`}/${getDate()}`
				: `${argv.path || `.`}`;
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
		}
		engine.files.forEach((file) => {
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
