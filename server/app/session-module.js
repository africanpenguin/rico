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

exports.add = function(sessions, favourites, callback){
  // TODO find better way to generate unique value to generate unique valuess
  var url_id = Math.random().toString(36).substr(2,7);
  var secret = Math.random().toString(36).substr(2,7);
  console.log(url_id)
  sessions.insert({
    'url_id': url_id,
    'secret': secret,
    'favourites': favourites
  }, callback);
};

exports.get = function(sessions, url_id, secret, callback){
  var find = {url_id: url_id};
  if(secret){
    find['secret'] = secret;
  }
  sessions.findOne(find, callback);
};

exports.update = function(sessions, url_id, secret, favourites, callback){
  exports.get(sessions, url_id, secret, function(err, item){
    if(err || item === null){
      callback('Bad id/secret combination.', null);
    }
    sessions.update({url_id: url_id}, {
      $set: {
        favourites: favourites
      }}, function (err, result) {
        callback(err, {
          url_id: url_id,
          favourites: favourites
        });
      });
  });
};
