const redditFetch = require('./redditFetch').fetchUrls;
const createVideo = require('./ffmpegProcessing').createVideo;

class VidzDitDL {
    #VIDEO_INFO;

    static async initialize(redditURL) {
        let redditVideo = await redditFetch(redditURL);
        return new VidzDitDL(redditVideo);
    }

    constructor(info) {
        this.VIDEO_INFO = info;
    }

    get videoInfo() {
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
            if (video.maxFormat == true) {
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

module.exports = VidzDitDL;