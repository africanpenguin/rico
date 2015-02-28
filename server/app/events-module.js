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

/**
 * Load from external source the list of events
 * and save in database
 *
 * @param url url to parse for import the schedule
 */
exports.load = function(events, url, callback){
  var ical = require('ical');
  var ret = [];
  ical.fromURL(url, {}, function(err, data){
    for(var k in data){
      if(data.hasOwnProperty(k)){
        if(data[k] instanceof Object && data[k]['type'] == 'VEVENT'){
          if(data[k]['attendee'] instanceof Object){
            move_key(data[k], 'summary', 'title');
            delete data[k]['params'];
            data[k]['speakers'] = [ data[k]['attendee']['params'][2] ];
            delete data[k]['attendee'];
            // TODO I'll can have multiple categories
            data[k]['track'] = data[k]['categories'][0];
            // move_key(data[k], 'categories', 'track');
            // data[k]['track'] = data[k]['track'][0];
            // console.log(data[k])
          }
          ret.push(data[k]);
        }
      }
    }
    // save collection in db
    events.insert(ret, callback);
  });
};
