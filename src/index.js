const redditFetch = require('./redditFetch').fetchUrls;
const createVideo = require('./ffmpegProcessing').createVideo;

class VidzditDL {
    #VIDEO_INFO;

    static async initialize(redditURL) {
        let redditVideo = await redditFetch(redditURL);
        return new VidzditDL(redditVideo);
    }

    constructor(info) {
        this.VIDEO_INFO = info;
    }

    get redditVideoInfo() {
        return this.VIDEO_INFO;
    }

    findFormatVideo(format) {
        let videosTypes = this.VIDEO_INFO.dashContent.video;

        for (let video of videosTypes) {
            if (video.format == format) {
                return video;
            }
        }

        throw new Error("Could not find video format");
    }

    findMaxFormatVideo() {
        let videosTypes = this.VIDEO_INFO.dashContent.video;

        for (let video of videosTypes) {
            if (video.MaxFormat == true) {
                return video;
            }
        }
    }

    async createVideo({ format, setLogging, setLogger, setProgress } = {}) {
        let videoFormat;

        try {
            videoFormat = this.findFormatVideo(format);
        } catch {
            videoFormat = this.findMaxFormatVideo();
        }

        return await createVideo({
            videoURL: videoFormat.url,
            audioURL: this.VIDEO_INFO.dashContent.audio.url,
            setLogging,
            setLogger,
            setProgress
        });
    }

};

module.exports = VidzditDL;