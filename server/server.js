var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var _ = require('underscore');

var endpoints = require('./endpoints');

var url = 'mongodb://192.168.178.28:27017/rico';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected to server at %s.', url);

    var server = restify.createServer();

    endpoints.process(server, db);

    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
    
    db.close();
});
