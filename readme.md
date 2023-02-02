<p align="center">
<img src="./assets/reddit-readme.gif"></img>
</p>

<h1 align="center">Vidzit-DL</h1>

A simple reddit video downloader that allows you to download videos from reddit using node js. **NOTE:** Video can't be embedded (No Youtube links, No Vimeo, etc). Made using [node-fetch](https://www.npmjs.com/package/node-fetch) and [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm).

# Table of Contents
- [Table of Contents](#table-of-contents)
- [How To Install](#how-to-install)
- [Example](#example)
- [API](#api)
    - [VidzitDL](#vidzitdl)
    - [VidzitDL.initialize(redditURL) ⇒ Promise.\<VidzitDL\>](#vidzitdlinitializeredditurl--promisevidzitdl)
    - [vidzitDL.videoInfo](#vidzitdlvideoinfo)
    - [vidzitDL.findFormatVideo(format) ⇒ JSON](#vidzitdlfindformatvideoformat--json)
    - [vidzitDL.findMaxFormatVideo() ⇒ JSON](#vidzitdlfindmaxformatvideo--json)
    - [vidzitDL.createVideo(options) ⇒ Promise.\<Uint8Array\>](#vidzitdlcreatevideooptions--promiseuint8array)

# How To Install
```bash
  npm install vidzit-dl
```

# Example
```js
const VidzitDL = require("vidzit-dl");

async function main() {
    let video1 = await VidzitDL.initialize("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    console.log(video1.videoInfo);
    console.log(await video1.createVideo({
        format: '480',
        setLogging: true,
        setLogger: function (type, message) {
            console.log(type + ": " + message);
        },
        setProgress: function (ratio) {
            console.log(ratio);
        }
    }));
}

main()
```

# API
<a name="VidzitDL"></a>

### VidzitDL
Download reddit videos through node.js

**Kind**: global class  
**See**: [https://github.com/Guuzzeji/reddit-vid-dl#readme](https://github.com/Guuzzeji/reddit-vid-dl#readme)  

---

<a name="new_VidzitDL_new"></a>

<a name="VidzitDL.initialize"></a>

### VidzitDL.initialize(redditURL) ⇒ [<code>Promise.&lt;VidzitDL&gt;</code>](#VidzitDL)
Initialize the VidezDitDL class and create an object from it.

**Kind**: static method of [<code>VidzitDL</code>](#VidzitDL)  
**Returns**: [<code>Promise.&lt;VidzitDL&gt;</code>](#VidzitDL) - returns an VidzitDL object that can be used to get information about the video dash urls and download the video  

| Param | Type | Description |
| --- | --- | --- |
| redditURL | <code>String</code> | A normal reddit url of the video post you want to download |

---

<a name="VidzitDL+videoInfo"></a>

### vidzitDL.videoInfo
Returns the video information like video url and reddit base url of post

**Kind**: instance property of [<code>VidzitDL</code>](#VidzitDL)  

---

<a name="VidzitDL+findFormatVideo"></a>

### vidzitDL.findFormatVideo(format) ⇒ <code>JSON</code>
Searchs dash file to find video resolution (Ex: 480, 720, 1080). It can also return an error if video resolution is not found.

**Kind**: instance method of [<code>VidzitDL</code>](#VidzitDL)  
**Returns**: <code>JSON</code> - A json of the video resolution url and other infomation  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | the video format you want (Ex: 480, 720, 1080) |

---

<a name="VidzitDL+findMaxFormatVideo"></a>

### vidzitDL.findMaxFormatVideo() ⇒ <code>JSON</code>
Searchs dash file to find video resolution for max resolution of video.

**Kind**: instance method of [<code>VidzitDL</code>](#VidzitDL)  
**Returns**: <code>JSON</code> - A json of the video resolution url and other infomation  
<a name="VidzitDL+createVideo"></a>

---

### vidzitDL.createVideo(options) ⇒ <code>Promise.&lt;Uint8Array&gt;</code>
Creates a video with the specified format you want. OR can default to max resolution if not specified.

**Kind**: instance method of [<code>VidzitDL</code>](#VidzitDL)  
**See**: More infomation how to use setLogger and setProgress [https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md#ffmpeg-setlogging](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md#ffmpeg-setlogging)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | JSON that stores all options for this function |
| options.format | <code>String</code> | The format you want to download (Ex: 480, 720, 1080). Default is max resolution if not specified. |
| options.setLogging | <code>Boolean</code> | Turn on/off if you want to see ffmpeg logs. Default is fale. |
| options.setLogger | <code>function</code> | Allows you to process ffmpeg logs with your own function. |
| options.setProgress | <code>function</code> | Allows you to process ffmpeg progresss with your own function. |
