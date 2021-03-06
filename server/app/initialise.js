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

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var settings = require('./settings');

MongoClient.connect(settings.mongo_url, function (err, db) {
  assert.equal(null, err);
  db.collection('sessions').ensureIndex({ 'url_id': 1 }, { unique: true }, function (err, index_name) {
    if (err !== null)
      console.log(err);
    db.close();
  });
});
