import * as pulumi from "@pulumi/pulumi";
import * as cloud from "@pulumi/cloud-aws";
import { Response, Request } from "@pulumi/cloud";

const api = new cloud.API('sendnudes-api');
api.get('/', (request: Request, response: Response) => {
    response.status(200).json('use POST request');
});

api.post('/', (request: Request, response: Response) => {
    // Steps:
    // 1. get API key for flickr
    // 2. search for photos using "tags and text"
    // 3. return first match

    // Future: use user defined tags

    // return static image

    // response.status(200).json('Hello POST small world');
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

exports.endpoint = api.publish().url;