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
    try{
		const queryObj = parseQueryString(request.body.toString());
    	const customParams = queryObj.text;

        const imageUrl = await getImageUrl(customParams);
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
    } 
    catch(err)
    {
        const blockResponse = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `Error executing script: ${err}`
                }
            }
            ]
        }

        response.status(200).json(
            blockResponse
        );  
    }
});

async function getTotalImageCount(searchTerm, filterBy) {
    const url = composeUrl(searchTerm, 1, 1, filterBy);

    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    return JSON.parse(flickrResponse).photos.total;
}

async function getImageUrl(filterBy) {
    const pageSize = 500;

    const searchNudeTerm = 'naked';
    const imageCount = await getTotalImageCount(searchNudeTerm, filterBy);
    const pageCount = imageCount / pageSize;

    console.log("pageCount", pageCount)

    const randomPageIndex = getRandomInteger(0, pageCount - 1);
    let randomImageIndex = getRandomInteger(0, pageSize);
    if(randomPageIndex == pageCount - 1)
    {
        randomImageIndex = getRandomInteger(0, pageCount % pageSize);
    }

    const url = composeUrl(searchNudeTerm, pageSize, randomPageIndex, filterBy);
    console.log('url', url);

    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    const randomMatch = JSON.parse(flickrResponse).photos.photo[randomImageIndex];

    console.log(`Selected page: ${randomPageIndex} with image index: ${randomImageIndex}`);
    console.log('randomMatch', randomMatch);

    const imageUrl = `https://farm${randomMatch.farm}.staticflickr.com/${randomMatch.server}/${randomMatch.id}_${randomMatch.secret}.jpg`;
    return imageUrl;
};

function composeUrl(text, pageSize, pageIndex, filterBy) {
    // TODO: filterBy is optional, can be blank
    var options = {
        "method": "flickr.photos.search",
        "api_key": "dc931bf8cee8b68e980c7b64b54d4849",
        //"text": text,
        "per_page": pageSize,
        "page": pageIndex,
        "format": "json",
        "nojsoncallback": "1",
        "safe_search": "3" // yes, send nudes please
      };

    let tagsArr = text.split(' ');
    if (filterBy) {
        const tags = filterBy.split(' ');
        tagsArr = tagsArr.concat(tags);
    }

    // First tags have the highest priority
    tagsArr = tagsArr.reverse();

    options.tags = tagsArr.join(',');

    const baseUrl = '/services/rest/?';
    let url = baseUrl;

    for (var property in options) {
        if (options.hasOwnProperty(property)) {
            url += `${property}=${options[property]}&`;
        }
    }

    console.log('url is', url);
    return url;
}

module.exports.endpoint = api.publish().url;

