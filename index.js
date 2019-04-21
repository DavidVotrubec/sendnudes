"use strict";
const pulumi = require("@pulumi/pulumi");
const cloud = require("@pulumi/cloud-aws");
const Flickr = require("flickrapi");

const api = new cloud.API('sendnudes-api');
api.get('/', (request, response) => {
    response.status(200).json('use POST request');
});

api.post('/', (request, response) => {
    // Steps:
    // 1. get API key for flickr
    // 2. search for photos using "tags and text"
    // 3. return first match

    // Future: use user defined tags

    // return static image

    
    const flickrOptions = {
      api_key: "dc931bf8cee8b68e980c7b64b54d4849",
      secret: "44db63bc197668c4"
    };

    console.log('flickR options defined', flickrOptions);

    // Flickr.authenticate(flickrOptions, function(error, flickr) {
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        // we can now use "flickr" as our API object
        console.log('flicks is', flickr);
        console.log('error is', error);

        flickr.photos.search({
            // user_id: flickr.options.user_id,
            page: 1,
            per_page: 5,
            text: "nude" // todo: use user input
          }, function(err, result) {
            // result is Flickr's response

            console.log('result of api call is', result, err);

            response.status(200).json(
                {
                    "blocks": [
                        {
                            "type": "image",
                            "title": {
                                "type": "plain_text",
                                "text": "Please enjoy looking at incredibly nude people"
                            },
                            "image_url": "https://live.staticflickr.com/8523/8536085141_590d835710_k.jpg",
                            "alt_text": "An incredibly nude human."
                        }
                    ]
                }
            );
          });
    });
    
});

module.exports.endpoint = api.publish().url;

