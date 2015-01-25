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
			// $scope.bid = $routeParams.bid;
			// $scope.board = BoardService.get($scope.bid);
      // EventsRestAPI.query(function(data){
      events = EventsService.getEvents()

      var myDays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

      events.forEach(function(event) {
        var s_date = new Date(event['start_time'])
        var sd = myDays[s_date.getDay()]
        var sh = s_date.getHours()
        var sm = s_date.getMinutes()

        event['start_time_formatted'] = sd + " " + sh + ":" + sm

        var e_date = new Date(event['end_time'])
        var ed = myDays[e_date.getDay()]
        var eh = e_date.getHours()
        var em = e_date.getMinutes()

        event['end_time_formatted'] = ed + " " + eh + ":" + em
      });

      $scope.events = events

      $scope.open = function(event){
        $modal.open({
          title: event.title,
          template: event.description,
          size: 'lg',
        })
      };
		}
]);

