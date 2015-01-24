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

assert = require('assert');
ObjectID = require('mongodb').ObjectID;

module.exports.process = function (server, db) {
  var events = db.collection('events');
  var sessions = db.collection('sessions');

  server.get('/events', function (req, res, next) {
    events.find().toArray(function (err, items) {
      assert.equal(null, err);
      res.send(items);
      return next();
    });
  });

  server.get('/events/:id', function (req, res, next) {
    events.findOne({_id: ObjectID(req.params.id)}, function (err, item) {
      assert.equal(null, err);
      res.send(item);
      return next();
    });
  });

  server.post('/sessions', function (req, res, next) {
    var url_id;
    var depth = 0;
    var gen_id = function (err, items) {
      if (depth > 20) { // Recursion depth limit
        res.send(503, 'Could not generate a new ID.');
        next();
      } else if (items !== null) { // Recursive case
        url_id = Math.random().toString(36).substr(2,7);
        depth++;
        sessions.findOne({'url_id': url_id}, gen_id);
      } else { // Base case
        console.log(req.params);
        assert(req.params.hasOwnProperty('favourites'));
        sessions.insert({
          'url_id': url_id,
          'favourites': req.params.favourites
        }, function (err, result) {
          res.send({'url_id': url_id});
          next();
        });
      }
    };
    gen_id(null, []);
  });

  server.get('/sessions/:id', function (req, res, next) {
    sessions.findOne({url_id: req.params.id}, function (err, item) {
      res.send(item);
    });
  });
};
