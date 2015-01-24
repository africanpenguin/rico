/*
Copyright 2015 Adrian Baran, Joe MacMahon, Leonardo Rossi

This file is part of Rico.

Rico is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

Rico is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with Rico.  If not, see <http://www.gnu.org/licenses/>.
*/

var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var endpoints = require('./endpoints');
var settings = require('./settings');


MongoClient.connect(settings.mongo_url, function(err, db) {
  if (err !== null) {
    console.log(err);
  }
  console.log('Connected to server at %s.', settings.mongo_url);

  var server = restify.createServer();

  server.pre(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  server.use(restify.acceptParser(server.acceptable));
  //server.use(restify.dateParser());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

  endpoints.process(server, db);

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

  server.on('close', function() {
    db.close();
  });
});
