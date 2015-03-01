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

  move_key = function(obj, orig, dest){
    obj[dest] = obj[orig];
    delete obj[orig];
  }

  server.post('/events', function (req, res, next){
    // url to parse for import the schedule
    var url = req.body['url'];
    var mev = require('./events-module.js');
    mev.load(events, url, function (err, result) {
          res.send({
            'ok': 'fuu'
          });
          next();
        });

    return next();
  })

  server.get('/events', function (req, res, next) {
    var mev = require('./events-module.js');
    mev.getAll(events, function (err, items) {
      assert.equal(null, err);
      res.send(items);
      return next();
    });
  });

  server.get('/events/:id', function (req, res, next) {
    var mev = require('./events-module.js');
    mev.get(events, ObjectID(req.params.id), function (err, item) {
      assert.equal(null, err);
      if (item === null) {
        res.send(404, 'No event found.');
        return next();
      } else {
        res.send(item);
        return next();
      }
    });
  });

  // FIXME Removeeeeee! (only for test)
  server.del('/events', function(req, res, next){
    db.dropCollection('events', function(err, result){
      res.send({'res': 'ok'});
      return next();
    });
  });

  server.post('/sessions', function (req, res, next) {
    assert(req.params.hasOwnProperty('favourites'));
    var mse = require('./session-module.js');
    mse.add(sessions, req.params.favourites, function (err, result) {
      res.send(result);
      next();
    });
  });

  server.get('/sessions/:url_id', function (req, res, next) {
    var mse = require('./session-module.js');
    mse.get(sessions, req.params.url_id, null, function (err, item) {
      assert.equal(null, err);
      if (item === null) {
        res.send(404, 'No session found.');
      } else {
        delete(item.secret);
        res.send(item);
      }
      return next();
    });
  });

  server.put('/sessions/:url_id/:secret', function (req, res, next) {
    var mse = require('./session-module.js');
    mse.update(sessions, req.params.url_id,
        req.params.secret, req.params.favourites,
        function (err, item) {
          console.log(item);
          if(err || item === null){
            res.send(405, err);
            return next();
          }
          console.log("hello");

          delete(item.secret);
          res.send(item);
          return next();
        });
  });
};
