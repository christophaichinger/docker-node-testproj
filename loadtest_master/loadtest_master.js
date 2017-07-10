var express = require('express'),
    http = require('http'),
    redis = require('redis'),
    times = require('lodash.times');

var app = express();

var client = redis.createClient('6379', 'redis');

function queueRequest() {
    client.lpush('requestsToSend', JSON.stringify({
        host: 'simple-counter',
        port: 8081,
        path: '/counter',
        method: 'GET',
        timeout: 10000,
        prot: 'http'
    }));
}


app.get('/loadtest', function(req, res, next) {
    times(1000, queueRequest);
    res.send('Queued 1000 requests');
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
    console.log('Listening on port ' + (process.env.PORT || 8080));
});