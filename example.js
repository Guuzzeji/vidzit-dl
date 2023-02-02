const VidzitDL = require("vidzit-dl");

async function main() {
    let video1 = await VidzitDL.initialize("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");
    console.log(video1.videoInfo);
    console.log(await video1.createVideo({
        setLogging: true,
    }));
}

main();