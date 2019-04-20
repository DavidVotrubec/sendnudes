import * as pulumi from "@pulumi/pulumi";
import * as cloud from "@pulumi/cloud-aws";
import { Response, Request } from "@pulumi/cloud";

const api = new cloud.API('sendnudes-api');
api.get('/', (request: Request, response: Response) => {
    response.status(200).json('Hello big world');
});

exports.endpoint = api.publish().url;