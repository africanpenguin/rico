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

// Session Service: to call rest api

RicoApp.factory("SessionsRestAPI", ['$resource', function($resource) {
  return $resource('http://192.168.178.30:8080/sessions/:sid/:secret');
}]);

RicoApp.service('SessionService', ['SessionRestAPI', function(SessionRestAPI){
  this.session = null

  // singleton
  this.getSession = function(sid){
    if(this.session == null){
      // this.session = []
      es = this
      // TODO check if not exists, create one!
      this.session = SessionRestAPI.get({ sid: sid })
    }
    return this.session
  }


}]);
