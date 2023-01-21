const fetch = require('node-fetch');
const XML = require('xml-js');

//* Gets the audio and video link from Reddit Api
exports.fetchUrls = async function (url) {
    let redditVideo = await fetch(url + '.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        return {
            baseURL: json[0].data.children[0].data.url,
            dashURL: json[0].data.children[0].data.secure_media.reddit_video.dash_url
        };
    });

    let dashFile = await fetch(redditVideo.dashURL).then(function (res) {
        return res.text();
    }).then(function (data) {
        return data;
    });

    return parseDASH(dashFile, redditVideo.baseURL);
};

function parseDASH(file, baseURL) {
    let jsonDash = JSON.parse(XML.xml2json(file, { compact: true }));

    let videoFormat = [];
    jsonDash.MPD.Period.AdaptationSet[0].Representation.forEach(element => {
        videoFormat.push(videoDash(element, baseURL));
    });

    // Getting max audio
    videoFormat.push(videoDash(jsonDash.MPD.Period.AdaptationSet[0], baseURL));

    return {
        redditURL: baseURL,
        video: videoFormat,
        audio: audioDash(jsonDash.MPD.Period.AdaptationSet[1], baseURL)
    };
}

function videoDash(json, baseURL) {
    return {
        type: "video",
        MaxFormat: (json.BaseURL != undefined) ? false : true,
        format: json._attributes.height || json._attributes.maxHeight,
        url: (json.BaseURL != undefined) ? `${baseURL}/${json.BaseURL._text}` : `${baseURL}/DASH_${json._attributes.maxHeight}.mp4`,
        info: json._attributes
    };
}

function audioDash(json, baseURL) {
    return {
        type: "audio",
        url: `${baseURL}/${json.Representation.BaseURL._text}`,
        info: json._attributes,
        audioInfo: json.Representation._attributes
    };
}

// Testing
this.fetchUrls("https://www.reddit.com/r/reactnative/comments/10hloqz/created_this_bottom_nav_using_reactnativeskia");

