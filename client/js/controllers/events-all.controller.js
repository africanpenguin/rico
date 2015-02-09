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

// Controller for All Events View

RicoApp.controller('EventsAllCtrl', [ '$scope', '$routeParams', '$route', '$rootScope', 'EventsService', '$modal',
		function($scope, $routeParams, $route, $rootScope, EventsService, $modal) {

      $scope.open = function(event){
        $modal.open({
          title: event.title,
          template: event.description,
          size: 'lg',
        })
      };

      $scope.toggleSelected = function(event){
        event.selected = !event.selected;
        // TODO save changes in session
      };

      // init model
      $scope.model = {}
      $scope.model.events = EventsService.getEvents()
      $scope.model.tracks = EventsService.getTracks()
      $scope.model.locations = EventsService.getLocations()

      // init filters
      $scope.filters = {}
      $scope.filters.query = ""
      $scope.filters.byTracks = [];
      $scope.filters.byLocations = [];
		}
]);

