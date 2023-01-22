const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

let ffmpeg_loaded = false;

const ffmpeg = createFFmpeg({
    log: false
});

//* Download Reddit Video either audio || frames || video
exports.dlVideo = async function (urls_json, type_dl) {

    //* help save computer power if you are running within an app or server env
    if (ffmpeg_loaded == false) {
        await ffmpeg.load();
        ffmpeg_loaded = true;
    }

    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(urls_json.frames));
    ffmpeg.FS('writeFile', 'aud.mp4', await fetchFile(urls_json.audio));

    await ffmpeg.run('-i', 'video.mp4', '-i', 'aud.mp4', '-c:v', 'copy', '-c:a', 'copy', 'output.mp4');

    //* Return Uint8Array which can be save as a file or something else
    return ffmpeg.FS('readFile', 'output.mp4');

};
