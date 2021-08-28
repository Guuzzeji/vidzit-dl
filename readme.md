<p align="center">
<img src="./reddit-readme.gif"></img>
</p>
<br>

# Reddit-vid-dl  & Reddit-dl Cli
<p>A simple reddit video downloader that allows you to download videos from reddit using node js.</o>
<p>Made using <a href="https://www.npmjs.com/package/node-fetch">node-fetch</a> and <a href="https://github.com/ffmpegwasm/ffmpeg.wasm">ffmpeg.wasm</a></p>

> NOTE: Video can't be embedded (No Youtube links, No Vimeo, etc).

</br>

# CLI Tool

>Note: CLI tools have only been tested on Mac OS

<p>Run reddit-dl in your terminal and paste in your reddit video url</p>

**Example**
```sh
reddit-dl https://www.reddit.com/r/dankvideos/comments/mxc6eb/korone_meme/
```

### Cli-Option
- **`--audio or -a`**
  - Download only audio 
- **`--frames or -f`** 
  -  Download video without audio
- **`--info or -in`** 
  -  Return json file of audio and video urls
- **`--help or help`** 
  -  Return list of commands to use

</br>

# API
- **`fetchUrls`** (function)
  -  (Parameter-1) Pass in the reddit video url 
  -  return the audio and video urls as a json file
- **`dlVideo`** (function) 
  - (Parameter-1) Pass in the json video and audio url from fetchUrls
  - (Parameter-2) Pass in either 'frames'-(video no audio), 'audio-(only audio), null-(video and audio)
  - Return either a stream or Uint8Array if you download both video and audio  

</br>

# Example Code
```js
const reddit_dl = require('./core');

async function main() {
    let url_one = await reddit_dl.fetchUrls('https://www.reddit.com/r/dankvideos/comments/mxc6eb/korone_meme/');
    let url_two = await reddit_dl.fetchUrls('https://www.reddit.com/r/dankvideos/comments/mxpjv4/i_miss_that_guy/');

    let vid_one = await reddit_dl.dlVideo(url_one);
    let vid_two = await reddit_dl.dlVideo(url_two, 'frames');

    console.log(vid_one.length, vid_two.length, 'Video Done');

}

main();
```
</br>

# How To Install
> Note: If you are getting any errors about webassembly and node, make sure you are have everything install right and run this line: 
> ```sh 
> node --experimental-wasm-threads --experimental-wasm-bulk-memory [index.js or whatever]
> ```
1. Clone this repo
2. Run `` npm install ``
3. To install into your project or get the CLI:
   - Copy and paste this project into your project and import ./core.js
   - Run ```npm link``` to install the cli tool
  
</br>

## Info
- Discord: Guuzzeji#2245
- Reddit: /u/Guuzzeji
