#!/usr/bin/env node

//Cli tooling
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).option(
    'audio', {
    alias: 'a',
    type: 'boolean',
    description: 'Download only the audio [MP3]'
}
).option(
    'frames', {
    alias: 'f',
    type: 'boolean',
    description: 'Download only the frames [MP4]'
}
).option(
    'info', {
    alias: 'in',
    type: 'boolean',
    description: 'Get Audio and Frames Urls'
}
).command('[Reddit-URL]', 'The reddit url always go in first. Will download both the video and audio as one in a mp4').argv;

//File system
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

//Main file
const core = require('../core');

let normal_url = argv._[0];

async function cli() {
    if (normal_url == null || normal_url == ' ') {
        console.log('Put a url or use help');
        return;
    }

    let json_url = await core.fetchUrls(normal_url);

    if (argv.info) {
        console.log(json_url);
    } else if (argv.frames) {
        console.log('Working...');
        let stream = await core.dlVideo(json_url, 'frames');

        let file = fs.createWriteStream(path.basename(path.join(process.cwd(), 'frames.mp4')));

        stream.pipe(file);

    } else if (argv.audio) {
        console.log('Working...');
        let stream = await core.dlVideo(json_url, 'audio');

        let file = fs.createWriteStream(path.basename(path.join(process.cwd(), 'audio.mp3')));

        stream.pipe(file);

    } else {
        //Need to do this in order for ffmpeg to run like normal
        exec(`node --experimental-wasm-threads --experimental-wasm-bulk-memory ${path.resolve(__dirname, 'run_ffmpeg.js')} ${normal_url}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log('Working...');
    }
}

cli();



