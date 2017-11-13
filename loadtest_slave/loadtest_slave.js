var http = require('http'),
    https = require('https'),
    redis = require('redis');

var client = redis.createClient('6379', 'redis');

let isShuttingDown = false;
const requestsQueueName = 'requestsToSend';

function heartBeat() {
    if(isShuttingDown) return;
    client.brpop(requestsQueueName, 0, function(err, data) {
        if(err) {
            console.error(err);
            return setImmediate(heartBeat);
        }

        var params = JSON.parse(String(data).substring(requestsQueueName.length + 1));
        console.log('send request with params: ' + JSON.stringify(params));

        var prot = params.prot === "http" ? http : https;

        var req = prot.request(params, function(res) {
            console.log('response from ' + params.host + ': ' + res.statusCode);
            client.lpush('responses', JSON.stringify({
                statusCode: res.statusCode,
                responseTime: res.responseTime,
                timestamp: new Date()
            }));
        });

        req.on('error', function(err) {
            console.log('error receiving response from ' + params.host);
            client.lpush('responses', JSON.stringify({
                statusCode: -1,
                responseTime: -1
            }));
        });

        req.end();


        setImmediate(heartBeat); // run this over and over again
    });
}

function shutdown() {
    isShuttingDown = true;
}

process
    .once('SIGINT', shutdown)
    .once('SIGTERM', shutdown);

heartBeat();