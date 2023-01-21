const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

let ffmpeg_loaded = false;

const ffmpeg = createFFmpeg({
    log: false
});

//* Download Reddit Video either audio || frames || video
exports.dlVideo = async function (urls_json, type_dl) {

    // ! type_dl can be 'frames' / 'audio' / null
    // * 'frames' = download frames 
    // * 'audio' = download mp3 audio
    // * null = normal video [Mp4 with video and audio]

    if (type_dl != null) {
        let vid_dl = null;

        if (type_dl == 'audio') {
            vid_dl = urls_json.audio;
        } else if (type_dl == 'frames') {
            vid_dl = urls_json.frames;
        }

        let stream = await fetch(vid_dl).then(function (res) {
            return res.body;
        });

        return stream;

        // Donwload Video [audio and Frames in one]
    } else {
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
    }

};
