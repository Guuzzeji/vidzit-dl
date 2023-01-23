const redditFetch = require('./src/redditFetch').fetchUrls;
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');
const fs = require('fs');


class RedditVideoDL {
    #videoDashFiles;
    #ffmpeg;

    static async initialize(redditURL) {
        let dashInfo = await redditFetch(redditURL);
        return new RedditVideoDL(dashInfo);
    }

    constructor(dashInfo) {
        this.videoDashFiles = dashInfo;
        this.ffmpeg = createFFmpeg({
            log: true
        });
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
    let video1 = await RedditVideoDL.initialize("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    console.log(video1.videoStreamsInfo);
    `
    // let video2 = new RedditVideoDL("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    // await video2.initialize();
    // fs.writeFileSync("./test.mp4", await video2.createVideo("720"));`;
}

main();