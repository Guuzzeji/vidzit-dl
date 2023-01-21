const fetch = require('node-fetch');
const XML = require('xml-js');

//* Gets the audio and video link from Reddit Api
exports.fetchUrls = async function (url) {
    let dashUrl = await fetch(url + '.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        return json[0].data.children[0].data.secure_media.reddit_video.dash_url;
    });

    let dashFile = await fetch(dashUrl + '.json').then(function (res) {
        return res.text();
    }).then(function (data) {
        return data;
    });

    parseDASH(dashFile);
};

function parseDASH(file) {
    let jsonDash = JSON.parse(XML.xml2json(file, { compact: true }));

    console.log(jsonDash.MPD.Period.AdaptationSet);
    console.log(jsonDash.MPD.Period);
}

// Testing
this.fetchUrls("https://www.reddit.com/r/reactnative/comments/10hloqz/created_this_bottom_nav_using_reactnativeskia");