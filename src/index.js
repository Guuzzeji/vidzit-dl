const redditFetch = require('./redditFetch').fetchUrls;
const createVideo = require('./ffmpegProcessing').createVideo;

class RedditVideoDL {
    #videoDashFiles;

    static async initialize(redditURL) {
        let dashInfo = await redditFetch(redditURL);
        return new RedditVideoDL(dashInfo);
    }

    constructor(dashInfo) {
        this.videoDashFiles = dashInfo;
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

        return await createVideo({
            videoURL: videoFormat.url,
            audioURL: this.videoDashFiles.dashContent.audio.url,
        });
    }

};

module.exports = RedditVideoDL;