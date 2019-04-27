"use strict";
const pulumi = require("@pulumi/pulumi");
const cloud = require("@pulumi/cloud-aws");
const { getRandomInteger } = require('./math');
const { sendHttpsRequest } = require('./send-http-request');
const { parseQueryString } = require('./parse-query-string');

const api = new cloud.API('sendnudes-api');
api.get('/', (request, response) => {
    response.status(200).json('use POST request');
});

api.post('/', async (request, response) => {
    // Future: use user defined tags
    
    const queryObj = parseQueryString(request.body.toString());
    const customParams = queryObj.text;

    console.log('customParams', customParams);

    const imageUrl = await getImageUrl();
    const blockResponse =         {
        "blocks": [
            {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": "Please enjoy looking at incredibly nude people"
                },
                "image_url": imageUrl,
                "alt_text": "An incredibly nude human."
            }
        ]
    };

    console.log("blockResponse: ", blockResponse)

    response.status(200).json(
        blockResponse
    );   
});

async function getTotalImageCount(searchTerm) {
    const url = composeUrl(searchTerm, 1, 1);

    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    return JSON.parse(flickrResponse).photos.total;
}

async function getImageUrl() {
    let imageCount = await getTotalImageCount("nude");
    if (imageCount >= 100000) {
        imageCount = 100000 - 1000;
    }

    const randomIndex = getRandomInteger(0, Math.floor(imageCount / 100));

    console.log('-----');
    console.log('');
    console.log('imageCount', imageCount, 'randomIndex', randomIndex);
    console.log('');
    console.log('-----');

    const url = composeUrl('nude', 100, randomIndex);
    console.log('url', url);

    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    // console.log('result is', flickrResponse);

    const randomPhotoIndex = getRandomInteger(0, 100);
    const randomMatch = JSON.parse(flickrResponse).photos.photo[randomPhotoIndex];

    console.log('randomMatch', randomMatch);

    const imageUrl = `https://farm${randomMatch.farm}.staticflickr.com/${randomMatch.server}/${randomMatch.id}_${randomMatch.secret}.jpg`;
    return imageUrl;
};

function composeUrl(text, pageSize, pageIndex) {
    var options = {
        "method": "flickr.photos.search",
        "api_key": "dc931bf8cee8b68e980c7b64b54d4849",
        "text": text,
        "per_page": pageSize,
        "page": pageIndex,
        "format": "json",
        "nojsoncallback": "1"
      };

    const baseUrl = '/services/rest/?';
    let url = baseUrl;

    for (var property in options) {
        if (options.hasOwnProperty(property)) {
            url += `${property}=${options[property]}&`;
        }
    }

    return url;
}

module.exports.endpoint = api.publish().url;

