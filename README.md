# sendnudes
App for Slack Hackathon at Producthub

## Authors
1. David Votrubec
1. Jan Peldřimovský

## Technologies used
1. Pulumi - for Lambda which retries pictures from Flickr [Free] - https://pulumi.io/quickstart/aws/setup.html
1. AWS Account [Free]
1. AWS cli - https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
1. Slack API

## Slack workspace
hackathon-vql7265.slack.com
OAuth token: xoxp-616316357782-602910397458-608017201425-6a991534cc3ea362e731012f14f3a310

## Flickr
API key: dc931bf8cee8b68e980c7b64b54d4849
secret: 44db63bc197668c4

### Aditional info
var options = {                                          // options used to send to flickr
  "method": "flickr.photos.search",
  "api_key": "",
  "text": "",
  "safe_search": "1",
  "per_page": "25",
  "page": "1",
  "format": "json",
  "nojsoncallback": "1"
};
https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dc931bf8cee8b68e980c7b64b54d4849&text=nude&format=json

## Setup workspace
1. Install Pulumi
1. configure access keys via `aws configure`
1. goto project dir and invoke `pulumi new typescript`. You might need to add `--force` when directory is not empty

