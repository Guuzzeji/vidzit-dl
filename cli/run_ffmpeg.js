#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

let normal_url = argv._[0];

const fs = require('fs');
const path = require('path');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const core = require('../core');

const ffmpeg = createFFmpeg({
    log: false
});

async function running() {
    let url = await core.fetchUrls(normal_url);

    await ffmpeg.load();

    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(url.frames));
    ffmpeg.FS('writeFile', 'aud.mp4', await fetchFile(url.audio));

    await ffmpeg.run('-i', 'video.mp4', '-i', 'aud.mp4', '-c:v', 'copy', '-c:a', 'copy', 'output.mp4');

    await fs.promises.writeFile(path.basename(path.join(process.cwd(), 'output.mp4')), ffmpeg.FS('readFile', 'output.mp4'));

    process.exit(0);
}

running();



