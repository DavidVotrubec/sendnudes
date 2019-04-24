
const https = require("https");

module.exports.sendHttpsRequest = function(options, payload) {
 
    return new Promise(function (resolve, reject) {
        try {
 
            let body = [];
            const request = https.request(options, function (res) {
 
                if (res.statusCode != 200) {
                    reject(res.statusCode);
                }
 
                res.on('data', (data) => {
                  body.push(data);
                });

                res.on('end', () => {
                    // at this point, `body` has the entire request body stored in it as a string
                    let result = Buffer.concat(body).toString();
                    resolve(result);
                    return;
                });

                res.on('error', async (err) => {
                    console.error('Errooooorrrr', err.stack);
                    console.error('Errooooorrrr request failed');
                    reject(err);
                    return;
                });     
            });
 
            if (payload) {
                request.write(payload);
            };
 
            request.end();
        }
        catch (e) {
            console.log('Something unexpected', e);
        } 
    });
 }
 