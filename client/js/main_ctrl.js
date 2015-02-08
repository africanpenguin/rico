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

var RicoApp = angular.module("RicoApp", [ 'ngRoute', 'ngResource', 'ui.bootstrap', 'ui.select', 'ngSanitize' ]);

RicoApp.config([
		'$routeProvider',
		'$locationProvider',
		'$rootScopeProvider',
		function($routeProvider, $locationProvider, $rootScopeProvider) {
			$routeProvider

      // Main Page
			.when('/Gui/Main', {
				templateUrl : 'templates/main-page.html',
				controller : 'MainCtrl',
			})

      // View All Events
			.when('/Gui/Events/All', {
				templateUrl : 'templates/events-all.html',
				controller : 'EventsAllCtrl',
			})

      .otherwise({
        redirectTo : '/Gui/Main'
			});
		}
]);

RicoApp.controller('MainCtrl', [
		'$scope',
		'$http',
		'$location',
		'$rootScope',
		'SessionRestAPI',
		function($scope, $http, $location, $rootScope, SessionRestAPI) {
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

			$scope.saveevent = function() {
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
				$location.path('/Gui/Boards/' + bid);
			};

			$scope.back = function(bid) {
				$location.path('/Gui/Boards/' + bid);
			};

		} ]);


