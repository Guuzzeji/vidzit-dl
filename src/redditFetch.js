const fetch = require('node-fetch');
const XML = require('xml-js');

//* Gets the audio and video link from Reddit Api
exports.fetchUrls = async function (url) {
    let redditVideo;

    try {
        redditVideo = await fetch(url + '.json').then(function (res) {
            return res.json();
        }).then(function (json) {
            let redditAPIData = json[0].data.children[0].data;

            if (isVideo(redditAPIData)) {
                return {
                    baseURL: redditAPIData.url,
                    dashURL: redditAPIData.secure_media.reddit_video.dash_url
                };
            } else {
                throw new Error("Was not a video");
            }
        });
    } catch (e) {
        throw e;
    }

    let dashFile = await fetch(redditVideo.dashURL).then(function (res) {
        return res.text();
    }).then(function (data) {
        return data;
    });

    return {
        baseURL: redditVideo.baseURL,
        dashURL: redditVideo.dashURL,
        dashContent: parseDASH(dashFile, redditVideo.baseURL)
    };
};

function parseDASH(file, baseURL) {
    let jsonDash = JSON.parse(XML.xml2json(file, { compact: true }));

    let videoFormat = [];
    jsonDash.MPD.Period.AdaptationSet[0].Representation.forEach(element => {
        videoFormat.push(videoDash(element, baseURL));
    });

    // Getting max video
    videoFormat.push(videoDash(jsonDash.MPD.Period.AdaptationSet[0], baseURL));

    return {
        video: videoFormat,
        audio: audioDash(jsonDash.MPD.Period.AdaptationSet[1], baseURL)
    };
}

function videoDash(json, baseURL) {
    return {
        type: "video",
        maxFormat: (json.BaseURL != undefined) ? false : true,
        format: json._attributes.height || json._attributes.maxHeight,
        url: (json.BaseURL != undefined) ? `${baseURL}/${json.BaseURL._text}` : `${baseURL}/DASH_${json._attributes.maxHeight}.mp4`,
        // info: json._attributes
    };
}

function audioDash(json, baseURL) {
    return {
        type: "audio",
        url: `${baseURL}/${json.Representation.BaseURL._text}`,
        // info: json._attributes,
        // audioInfo: json.Representation._attributes
    };
}

function isVideo(json) {
    if (!json.is_video || json.secure_media == undefined || json.secure_media == null) {
        return false;
    }

    return true;
}

// Testing
// this.fetchUrls("https://www.reddit.com/r/IndieDev/comments/10hgvjq/vr_has_been_punishing_for_particles");

