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

        throw new Error("Could not find video format");
    }

    findMaxFormatVideo() {
        let videosTypes = this.videoDashFiles.dashContent.video;

        for (let video of videosTypes) {
            if (video.MaxFormat == true) {
                return video;
            }
        }
    }

    async createVideo(format) {
        let videoFormat;

        try {
            videoFormat = this.findFormatVideo(format);
        } catch {
            videoFormat = this.findMaxFormatVideo();
        }

        return await createVideo({
            videoURL: videoFormat.url,
            audioURL: this.videoDashFiles.dashContent.audio.url,
        });
    }

};

module.exports = RedditVideoDL;