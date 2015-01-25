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

// Event Service: to call rest api

RicoApp.factory("EventsRestAPI", ['$resource', function($resource) {
  return $resource('http://192.168.178.30:8080/events');
}]);

RicoApp.service('EventsService', ['EventsRestAPI', function(EventsRestAPI){
  this.events = null
  this.tracks = null

  // singleton
  this.getEvents = function(callback){
    if(this.events == null){
      if(!callback){
        this.events = EventsRestAPI.query()
      }else{
        this.events = EventsRestAPI.query(function(){
          callback(this.events)
        })
      }
    }
    return this.events
  }

  // singleton
  this.getTracks = function(){
    if(this.tracks == null){
      this.tracks = []
      es = this
      events = this.getEvents(function(events){
        events.forEach(function(event){
          var track = event['track']
          if($.inArray(track, es.tracks) < 0){
            es.tracks.push(track)
          }
        })
      })
    }
    return this.tracks
  }


}]);
