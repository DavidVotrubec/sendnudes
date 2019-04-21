# sendnudes
App for Slack Hackathon

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
OAuth token: xoxp-616316357782-602910397458-602916377874-fb7574d071d9d8f37e7e4cd5d5eca1e3

## Setup workspace
1. Install Pulumi
1. configure access keys via `aws configure`
1. goto project dir and invoke `pulumi new typescript`. You might need to add `--force` when directory is not empty
