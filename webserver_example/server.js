var express = require('express'),
    http = require('http'),
    guid = require('guid');

var app = express();
var instance_id = guid.create();

app.get('/', function(req, res, next) {
    res.send('instance: '+instance_id+'\n');
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
    console.log('Listening on port ' + (process.env.PORT || 8080));
});