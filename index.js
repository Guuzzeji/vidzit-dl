const redditFetch = require('./src/redditFetch');

class RedditVideoDL {

    #videoDashFiles;

    constructor(redditURL) {
        this.videoDashFiles = redditFetch(redditURL);
    }

    get videoDashFiles() {
        return this.videoDashFiles;
    }

}