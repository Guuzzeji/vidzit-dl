exports.RedditVideoDL = require("./src/index");

// Testing
const RedditVideoDL = require("./src/index");

async function main() {
    let video1 = await RedditVideoDL.initialize("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    console.log(await video1.createVideo("720"));
}

main();