const redditFetch = require('./redditFetch').fetchUrls;
const createVideo = require('./ffmpegProcessing').createVideo;

/** Download reddit videos through node.js 
 * @see {@link https://github.com/Guuzzeji/reddit-vid-dl#readme}
*/
class VidzitDL {

    /**
     * Used to store dash infomation created by redditFetch function
     */
    #VIDEO_INFO;

    /**
     * Initialize the VidezDitDL class and create an object from it.
     * @async
     * @param {String} redditURL A normal reddit url of the video post you want to download
     * @returns {Promise<VidzitDL>} returns an VidzitDL object that can be used to get information about the video dash urls and download the video
     */
    static async initialize(redditURL) {
        let redditVideo = await redditFetch(redditURL);
        return new VidzitDL(redditVideo);
    }

    /**
     * DO NOT USE! Use the initialize function instead
     * @see {@link initialize}
     * @param {JSON} info - dash infomation from
     */
    constructor(info) {
        this.#VIDEO_INFO = info;
    }

    /**
     * Returns the video information like video url and reddit base url of post
     */
    get videoInfo() {
        return this.#VIDEO_INFO;
    }

    /**
     * Searchs dash file to find video resolution (Ex: 480, 720, 1080). It can also return an error if video resolution is not found.
     * @param {String} format the video format you want (Ex: 480, 720, 1080)
     * @returns {JSON} A json of the video resolution url and other infomation 
     */
    findFormatVideo(format) {
        let videosTypes = this.#VIDEO_INFO.dashContent.video;

        for (let video of videosTypes) {
            if (video.format == format) {
                return video;
            }
        }

        throw new Error("Could not find video format");
    }

    /**
     * Searchs dash file to find video resolution for max resolution of video.
     * @returns {JSON} A json of the video resolution url and other infomation 
     */
    findMaxFormatVideo() {
        let videosTypes = this.#VIDEO_INFO.dashContent.video;

        for (let video of videosTypes) {
            if (video.maxFormat == true) {
                return video;
            }
        }
    }

    /**
     * Creates a video with the specified format you want. OR can default to max resolution if not specified.
     * @async
     * @param {Object} options JSON that stores all options for this function
     * @param {String} options.format The format you want to download (Ex: 480, 720, 1080). Default is max resolution if not specified.
     * @param {Boolean} options.setLogging Turn on/off if you want to see ffmpeg logs. Default is fale.
     * @param {Function} options.setLogger Allows you to process ffmpeg logs with your own function.
     * @param {Function} options.setProgress Allows you to process ffmpeg progresss with your own function.
     * @see More infomation how to use setLogger and setProgress {@link https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md#ffmpeg-setlogging}
     * @returns {Promise<Uint8Array>}
     */
    async createVideo({ format, setLogging, setLogger, setProgress } = {}) {
        let videoFormat;

        try {
            videoFormat = this.findFormatVideo(format);
        } catch {
            videoFormat = this.findMaxFormatVideo();
        }

        return await createVideo({
            videoURL: videoFormat.url,
            audioURL: this.#VIDEO_INFO.dashContent.audio.url,
            setLogging,
            setLogger,
            setProgress
        });
    }

};

module.exports = VidzitDL;