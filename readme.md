<p align="center">
<img src="./assets/reddit-readme.gif"></img>
</p>

<h1 align="center">Vidzit-DL</h1>

A simple reddit video downloader that allows you to download videos from reddit using node js. Made using [node-fetch](https://www.npmjs.com/package/node-fetch) and [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm).

**IMPORTANT NOTE:** Video can't be embedded (No Youtube links, No Vimeo, etc).

# 📌 Table of Contents
- [📌 Table of Contents](#-table-of-contents)
- [💻 How To Install](#-how-to-install)
- [✏️ Example](#️-example)
- [📖 API](#-api)
    - [VidzitDL](#vidzitdl)
    - [VidzitDL.initialize(redditURL) ⇒ Promise.\<VidzitDL\>](#vidzitdlinitializeredditurl--promisevidzitdl)
    - [vidzitDL.videoInfo](#vidzitdlvideoinfo)
    - [Example of Return JSON](#example-of-return-json)
    - [vidzitDL.findFormatVideo(format) ⇒ JSON](#vidzitdlfindformatvideoformat--json)
    - [Example of Return JSON](#example-of-return-json-1)
    - [vidzitDL.findMaxFormatVideo() ⇒ JSON](#vidzitdlfindmaxformatvideo--json)
    - [Example of Return JSON](#example-of-return-json-2)
    - [vidzitDL.createVideo(options) ⇒ Promise.\<Uint8Array\>](#vidzitdlcreatevideooptions--promiseuint8array)
- [🤝 How to Contribute (Thank You!)](#-how-to-contribute-thank-you)

# 💻 How To Install
```bash
npm install vidzit-dl
```

# ✏️ Example
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

# 📖 API
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

### Example of Return JSON
```js
{
  baseURL: "{URL to reddit post}"
  dashURL: "{URL to dash file}",
  dashContent: {
    video: [
      {
        type: "video",
        maxFormat: true || false,
        format: "720",
        url: "{URL to video format}",
      },
      ...
    ],
    audio: {
      type: "audio",
      url: "{URL to audio files}",
    }
  }
}
```

---

<a name="VidzitDL+findFormatVideo"></a>

### vidzitDL.findFormatVideo(format) ⇒ <code>JSON</code>
Searchs dash file to find video resolution (Ex: 480, 720, 1080). It can also return an error if video resolution is not found.

**Kind**: instance method of [<code>VidzitDL</code>](#VidzitDL)  
**Returns**: <code>JSON</code> - A json of the video resolution url and other infomation  

| Param | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | the video format you want (Ex: 480, 720, 1080) |

### Example of Return JSON
```js
{
  type: "video",
  maxFormat: true || false,
  format: "720",
  url: "{URL to video format}",
}
```

---

<a name="VidzitDL+findMaxFormatVideo"></a>

### vidzitDL.findMaxFormatVideo() ⇒ <code>JSON</code>
Searchs dash file to find video resolution for max resolution of video.

**Kind**: instance method of [<code>VidzitDL</code>](#VidzitDL)  
**Returns**: <code>JSON</code> - A json of the video resolution url and other infomation  
<a name="VidzitDL+createVideo"></a>

### Example of Return JSON
```js
{
  type: "video",
  maxFormat: true,
  format: "1080",
  url: "{URL to video format}",
}
```

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

---

# 🤝 How to Contribute (Thank You!)
- Fork the main branch

- Open your fork and add your changes / features / bug fixes

- Create a pull request
  - Make sure to add a description of what changes you have made and why your changes are important.

