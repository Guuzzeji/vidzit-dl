const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

exports.createVideo = async function ({ videoURL, audioURL, setLogging = false, setLogger, setProgress }) {
    const ffmpeg = createFFmpeg();

    // Will print out ffmpeg logs
    ffmpeg.setLogging(setLogging);

    ffmpeg.setLogger(({ type, message }) => {
        try {
            setLogger(type, message);
        } catch {
            if (setLogger) {
                console.log(type, "=>", message);
            } else {
                return;
            }
        }
    });

    ffmpeg.setProgress(({ ratio }) => {
        try {
            setProgress(ratio);
        } catch {
            return;
        }
    });

    await ffmpeg.load();

    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoURL));
    ffmpeg.FS('writeFile', 'audio.mp4', await fetchFile(audioURL));

    await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.mp4', '-c:v', 'copy', '-c:a', 'copy', 'output.mp4');

    //* Return Uint8Array which can be save as a file or something else\
    try {
        return ffmpeg.FS('readFile', 'output.mp4');
    } finally {
        ffmpeg.exit();
    }
};