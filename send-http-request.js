
const https = require("https");

module.exports.sendHttpsRequest = function(options, payload) {
    // console.log(`sending request to ${options.host}`);
 
    return new Promise(function (resolve, reject) {
        try {
            // console.log( `request to ${options.host} has been sent A`);
 
            let body = [];
            const request = https.request(options, function (res) {
                // console.log('statusCode:', res.statusCode);
                // console.log('headers:', res.headers);
 
                if (res.statusCode != 200) {
                    reject(res.statusCode);
                }
 
                res.on('data', (data) => {
                  body.push(data);
                  console.log('we have received this data');
                  console.log(data.toString());
                  console.log('---- received data --- see above.');
 
                  // It seems that the 'request.on('end') is never fired
                  // I receive the data in the first batch, and that's it
                //   resolve(data.toString());
                });

                res.on('end', () => {
                    console.error('Request A ended');
                    // at this point, `body` has the entire request body stored in it as a string
                    let result = Buffer.concat(body).toString();
                    console.log('');
                    console.log(' ///////////////////////////////////////////');
                    console.log('');
                    console.log('result', result);
                    resolve(result);

                    return;
                });
     
            });
 
            request.on('end', () => {
                console.error('Request ended');
                // at this point, `body` has the entire request body stored in it as a string
                let result = Buffer.concat(body).toString();
                console.log('');
                console.log(' ///////////////////////////////////////////');
                console.log('');
                console.log('result', result);
                resolve(result);
            });
 
            request.on('error', async (err) => {
              console.error('Errooooorrrr', err.stack);
              console.error('Errooooorrrr request failed');
              reject(err);
            });
 
            // console.log('Payload is', payload);
 
            if (payload) {
                request.write(payload);
            };
 
            request.end();
        }
        catch (e) {
            console.log('Something unexpected', e);
        }
 
    //   console.log( `request to ${options.host} has been sent B`);
    });
 }