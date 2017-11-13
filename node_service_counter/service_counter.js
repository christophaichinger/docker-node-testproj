var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();

var client = redis.createClient('6379', 'redis');

app.get('/counter', function(req, res, next) {
    client.incr('counter', function(err, counter) {
        if(err) return next(err);
        res.send('Request counter (since redis container creation): ' + counter + '\n');
    });
});

http.createServer(app).listen(process.env.PORT || 8081, function() {
    console.log('Listening on port ' + (process.env.PORT || 8081));
});