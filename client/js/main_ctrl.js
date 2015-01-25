/**
 * Copyright (C) 2014 Leonardo Rossi <leonardo.rossi@studenti.unipr.it>
 *
 * This source code is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This source code is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this source code; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 *
 */

var RicoApp = angular.module("RicoApp", [ 'ngRoute', 'ngResource', 'ui.bootstrap' ]);

RicoApp.config([
		'$routeProvider',
		'$locationProvider',
		'$rootScopeProvider',
		function($routeProvider, $locationProvider, $rootScopeProvider) {
			$routeProvider

			.when('/Gui/Events/All', {
				templateUrl : 'templates/events-all.html',
				controller : 'EventsAllCtrl',
			})

/*			.when('/Gui/Boards/events/:lid', {
				templateUrl : 'templates/event-read.html',
				controller : 'eventReadCtrl',
			}).

      when('/Gui/Boards/:bid/events/:lid/Delete', {
				templateUrl : 'templates/event-delete.html',
				controller : 'eventDeleteCtrl'
			})
*/
      .otherwise({
        redirectTo : '/Gui/Events/All'
			});
		}
]);

RicoApp.controller('MainCtrl', [
		'$scope',
		'$http',
		'$location',
		'$rootScope',
		'SessionsRestAPI',
		function($scope, $http, $location, $rootScope, SessionsRestAPI) {
			$scope.$on('boards:updated', function(card, data) {
				$scope.events = data;
			});

		}
]);

RicoApp.controller('EventsAllCtrl', [ '$scope', '$routeParams', '$route', '$rootScope', 'EventsRestAPI', '$modal',
		function($scope, $routeParams, $route, $rootScope, EventsRestAPI, $modal) {
			$scope.bid = $routeParams.bid;
			// $scope.board = BoardService.get($scope.bid);
      EventsRestAPI.query(function(data){
        events = data

        var myDays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

        events.forEach(function(event) {
          var s_date = new Date(event['start_time'])
          var sd = myDays[s_date.getDay()]
          var sh = s_date.getHours()
          var sm = s_date.getMinutes()

          event['start_time'] = sd + " " + sh + ":" + sm

          var e_date = new Date(event['end_time'])
          var ed = myDays[e_date.getDay()]
          var eh = e_date.getHours()
          var em = e_date.getMinutes()

          event['end_time'] = ed + " " + eh + ":" + em
        });

        $scope.events = events

      })

      $scope.open = function(event){
        $modal.open({
          title: event.title,
          template: event.description,
          size: 'lg',
        })
      };
		}
]);

// TODO convert in "save in Favourites"
RicoApp.controller('eventChooseCtrl', [
		'$scope',
		'$routeParams',
		'$route',
		'$routeParams',
		'SessionsRestAPI',
		'$location',
		function($scope, $routeParams, $route, $routeParams, SessionsRestAPI,
				$location) {
			// $scope.newevent = BoardService.getevent($routeParams.bid,
					// $routeParams.lid);

			$scope.saveevent = function() {
				// var bid = $scope.newevent.board;
				// BoardService.saveevent($scope.newevent);
				$scope.newevent = {};
				$location.path('/Gui/Boards/' + bid);
			};
		} ]);

// TODO convert in "remove from Favourites"
RicoApp.controller('eventDeleteCtrl', [ '$scope', '$routeParams', '$http',
		'SessionsRestAPI', '$location',
		function($scope, $routeParams, $http, SessionsRestAPI, $location) {
			$scope.bid = $routeParams.bid;
			$scope.lid = $routeParams.lid;

			$scope.removeevent = function(bid, lid) {
				// console.log(bid + ' ' + lid);
				// BoardService.removeevent(bid, lid);
				$location.path('/Gui/Boards/' + bid);
			};

			$scope.back = function(bid) {
				$location.path('/Gui/Boards/' + bid);
			};

		} ]);

RicoApp.factory("EventsRestAPI", ['$resource', function($resource) {
  return $resource('http://192.168.178.30:8080/events');
}]);

RicoApp.factory("SessionsRestAPI", ['$resource', function($resource) {
  return $resource('http://192.168.178.30:8080/sessions/:uid/:sid');
}]);

