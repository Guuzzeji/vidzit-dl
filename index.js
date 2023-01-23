exports.RedditVideoDL = require("./src/index");

// Testing
const RedditVideoDL = require("./src/index");

async function main() {
    let video1 = await RedditVideoDL.initialize("https://www.reddit.com/r/videos/comments/1055vt8/youtube_is_run_by_fools_prozd");
    console.log(await video1.createVideo());
}

main();