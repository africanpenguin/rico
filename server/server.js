var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var endpoints = require('./endpoints');
var settings = require('./settings');


MongoClient.connect(settings.mongo_url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected to server at %s.', settings.mongo_url);

  var server = restify.createServer();

  endpoints.process(server, db);

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
  
  db.close();
});
