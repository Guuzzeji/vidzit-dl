const redditFetch = require('./src/redditFetch').fetchUrls;
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');
const fs = require('fs');


class RedditVideoDL {

    #videoDashFiles;
    #redditURL;
    #ffmpeg;

    constructor(redditURL) {
        this.redditURL = redditURL;
    }

    get videoStreamsInfo() {
        return this.videoDashFiles;
    }

    findFormatVideo(format) {
        let videosTypes = this.videoDashFiles.dashContent.video;

        for (let video of videosTypes) {
            if (video.format == format) {
                return video;
            }
        }

        return null;
    }

    async initialize() {
        this.videoDashFiles = await redditFetch(this.redditURL);
        this.ffmpeg = createFFmpeg({
            log: true
        });
    }

    async createVideo(format) {

        let videoFormat = this.findFormatVideo(format);

        await this.ffmpeg.load();

        this.ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoFormat.url));
        this.ffmpeg.FS('writeFile', 'aud.mp4', await fetchFile(this.videoDashFiles.dashContent.audio.url));

        await this.ffmpeg.run('-i', 'video.mp4', '-i', 'aud.mp4', '-c:v', 'copy', '-c:a', 'copy', 'output.mp4');

        //* Return Uint8Array which can be save as a file or something else\
        try {
            return this.ffmpeg.FS('readFile', 'output.mp4');
        } finally {
            this.ffmpeg.exit();
        }
    }

}

// Testing
async function main() {
    let video1 = new RedditVideoDL("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    await video1.initialize();
    console.log(await video1.createVideo("720"));

    let video2 = new RedditVideoDL("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    await video2.initialize();
    fs.writeFileSync("./test.mp4", await video2.createVideo("720"));
}

main();