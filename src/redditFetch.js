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

    parseDASH(dashFile, redditVideo.baseURL);
};

function parseDASH(file, baseURL) {
    let jsonDash = JSON.parse(XML.xml2json(file, { compact: true }));

    console.log(jsonDash.MPD.Period.AdaptationSet[1]);

    let formats = [];

    formats.push(audioDash(jsonDash.MPD.Period.AdaptationSet[1], baseURL));

    console.log(formats);

}

function videoDash(json, baseURL) {
    return {
        type: json._attributes.contentType,
        format: json._attributes.height || json._attributes.maxHeight,
        url: (json.BaseURL != undefined) ? `${baseURL}/${json.BaseURL._text}` : `${baseURL}/DASH_${json._attributes.maxHeight}.mp4`,
        info: json._attributes
    };
}

function audioDash(json, baseURL) {
    return {
        type: json._attributes.contentType,
        url: `${baseURL}/${json.Representation.BaseURL._text}`,
        info: json._attributes,
        audioInfo: json.Representation._attributes
    };
}

// Testing
this.fetchUrls("https://www.reddit.com/r/reactnative/comments/10hloqz/created_this_bottom_nav_using_reactnativeskia");

