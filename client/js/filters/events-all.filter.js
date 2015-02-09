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

RicoApp.filter('filterBySelectedTracks', function(){
  return function(events, tracks){
    if(tracks.length == 0){
      // if nothing selected, return all events
      return events;
    }
    // start filtering..
    var filtered = [];
    events.forEach(function(event){
      if($.inArray(event.track, tracks) >= 0){
        filtered.push(event)
      }
    })
    return filtered;
  };
});

RicoApp.filter('filterBySelectedLocations', function(){
  return function(events, locations){
    if(locations.length == 0){
      // if nothing selected, return all events
      return events;
    }
    // start filtering..
    var filtered = [];
    events.forEach(function(event){
      if($.inArray(event.location, locations) >= 0){
        filtered.push(event)
      }
    })
    return filtered;
  };
});


