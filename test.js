const Flickr = require("flickrapi");
const { getRandomInteger } = require('./math');

function test() {
    const flickrOptions = {
        api_key: "dc931bf8cee8b68e980c7b64b54d4849",
        secret: "44db63bc197668c4",
        timeout: 3000
    };

    // Flickr.authenticate(flickrOptions, function(error, flickr) {
    const token = Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        // we can now use "flickr" as our API object
        console.log('flicks is', flickr);
        console.log('error is', error);

        const randomPage = getRandomInteger(1, 100);

        const searchResult =  flickr.photos.search({
            // user_id: flickr.options.user_id,
            page: randomPage,
            per_page: 500,
            text: "nude" // todo: use user input
        }, function(err, result) {
            // result is Flickr's response
            var rnd = getRandomInteger(0, 500);

            const randomMatch = result.photos.photo[rnd];

            // console.log('random match', randomMatch);

            var url = `https://farm${randomMatch.farm}.staticflickr.com/${randomMatch.server}/${randomMatch.id}_${randomMatch.secret}.jpg`;
            console.log('image url is', url);
        });

        console.log('searchResult', searchResult);
    });

    console.log('token', token);
};

test();

// function test2() {
//     console.log('bbbb');
// }
// test2();