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
  return $resource('/demo/events.json');//('http://nodejs:8080/events');
}]);

RicoApp.service('EventsService', ['EventsRestAPI', 'SessionService', function(EventsRestAPI, SessionService){
  this.events = null
  this.tracks = null
  this.locations = null
  this.sid = 1

  // singleton
  this.getEvents = function(callback){
    if(this.events == null){
      this.events = EventsRestAPI.query(function(data){
        var session = SessionService.getSession()
        session.$promise.then(function(session){
          data.forEach(function(event){
            if($.inArray(event.id, session.favorites) < 0){
              event.selected = false;
            }else{
              event.selected = true;
            }
          });
        });
      })
    }
    return this.events
  }

  // singleton
  this.getTracks = function(){
    if(this.tracks == null){
      this.tracks = []
      es = this
      events = this.getEvents()
      events.$promise.then(function(data){
        data.forEach(function(event){
          var track = event['track']
          if($.inArray(track, es.tracks) < 0){
            es.tracks.push(track)
          }
        })
      })
    }
    return this.tracks
  }

  // singleton
  this.getLocations = function(){
    if(this.locations == null){
      this.locations = []
      es = this
      events = this.getEvents()
      events.$promise.then(function(data){
        data.forEach(function(event){
          var location = event['location']
          if($.inArray(location, es.locations) < 0){
            es.locations.push(location)
          }
        })
      })
    }
    return this.locations
  }

  this.getTrackEvents = function(track){
    filtered_events = []
    events = this.getEvents()
    events.$promise.then(function(data){
      data.forEach(function(event){
        if(track == event['track']){
          filtered_events.push(event)
        }
      })
    })
    return filtered_events
  }

  this.getLocationEvents = function(track){
    filtered_events = []
    events = this.getEvents()
    events.$promise.then(function(data){
      data.forEach(function(event){
        if(track == event['location']){
          filtered_events.push(event)
        }
      })
    })
    return filtered_events
  }

}]);
