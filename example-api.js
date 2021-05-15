let reddit_dl = require('./core');

async function main() {
    let url_one = await reddit_dl.fetchUrls('https://www.reddit.com/r/dankvideos/comments/mxc6eb/korone_meme/');
    let url_two = await reddit_dl.fetchUrls('https://www.reddit.com/r/dankvideos/comments/mxpjv4/i_miss_that_guy/');

    let vid_one = await reddit_dl.dlVideo(url_one);
    let vid_two = await reddit_dl.dlVideo(url_two, 'frames');

    console.log(vid_one.length, vid_two.length, 'Video Done');

}

main();