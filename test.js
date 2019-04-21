const { getRandomInteger } = require('./math');
const { sendHttpsRequest } = require('./send-http-request');

async function getTotalImageCount(searchTerm) {
    const url = composeUrl(searchTerm, 1, 1);
    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    return JSON.parse(flickrResponse).photos.total;
}

async function getImageUrl() {
    // TODO: Send 2 requests
    // First to get total page size
    // second to get random image in pagesSize of 1
    
    const flickrOptions = {
        api_key: "dc931bf8cee8b68e980c7b64b54d4849",
        secret: "44db63bc197668c4"
    };

    const imageCount = await getTotalImageCount("nude")
    const randomIndex = getRandomInteger(0, imageCount);


    const url = composeUrl('nude', 1, randomIndex);
    console.log('url', url);

    const flickrResponse = await sendHttpsRequest({
        host: 'api.flickr.com',
        path: url,
        method: 'GET'
    }, null);

    console.log('result is', flickrResponse);

    const randomMatch = JSON.parse(flickrResponse).photos.photo[randomIndex];

    console.log('randomMatch', randomMatch);

    // https://farm66.staticflickr.com/65535/46927517424_6ae83237f7.jpg
    const imageUrl = `https://farm${randomMatch.farm}.staticflickr.com/${randomMatch.server}/${randomMatch.id}_${randomMatch.secret}.jpg`;
    console.log('url', imageUrl);
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

    // const baseUrl = 'api.flickr.com/services/rest/?';
    const baseUrl = '/services/rest/?';
    let url = baseUrl;

    for (var property in options) {
        if (options.hasOwnProperty(property)) {
            url += `${property}=${options[property]}&`;
        }
    }

    return url;
}


test();

// function test2() {
//     console.log('bbbb');
// }
// test2();