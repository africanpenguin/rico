/*
 Copyright 2015 Adrian Baran, Joe MacMahon, Leonardo Rossi

 This file is part of Rico.

 Rico is free software: you can redistribute it and/or modify it under the
 terms of the GNU Affero General Public License as published by the Free
 Software Foundation, either version 3 of the License, or (at your option) any
 later version.

 Rico is distributed in the hope that it will be useful, but WITHOUT ANY
 WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 details.

 You should have received a copy of the GNU Affero General Public License along
 with Rico.  If not, see <http://www.gnu.org/licenses/>.
 */

var RicoApp = angular.module("RicoApp", [ 'ngRoute', 'ngResource', 'ui.bootstrap' ]);

RicoApp.config([
  '$routeProvider',
  '$locationProvider',
  '$rootScopeProvider',
  function($routeProvider, $locationProvider, $rootScopeProvider) {
	$routeProvider

    // Main Page
	  .when('/Gui/Main', {
		templateUrl : 'templates/main-page.html',
		controller : 'MainCtrl'
	  })

    // View All Events
	  .when('/Gui/Events/All', {
		templateUrl : 'templates/events-all.html',
		controller : 'EventsAllCtrl'
	  })

    // View Events By Track
	  .when('/Gui/Events/ByTrack', {
		templateUrl : 'templates/events-by-track.html',
		controller : 'EventsByTrackCtrl'
	  })

    // View Events By Track - view events of a track
      .when('/Gui/Events/ByTrack/:track', {
        templateUrl : 'templates/events-by-track-track.html',
        controller : 'EventsByTrackTrackCtrl'
      })

    // View Events By Location
	  .when('/Gui/Events/ByLocation', {
		templateUrl : 'templates/events-by-location.html',
		controller : 'EventsByLocationCtrl'
	  })

    // View Events By Location - view events of a location
      .when('/Gui/Events/ByLocation/:location', {
        templateUrl : 'templates/events-by-location-location.html',
        controller : 'EventsByLocationLocationCtrl'
      })

    // View My Favorites Events
	  .when('/Gui/Events/MyFavorites', {
		templateUrl : 'templates/events-my-favorites.html',
		controller : 'EventsMyFavoritesCtrl'
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
  'SessionsRestAPI',
  function($scope, $http, $location, $rootScope, SessionsRestAPI) {
    /*			$scope.$on('boards:updated', function(card, data) {
	 $scope.events = data;
	 });
     */
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
RicoApp.controller('eventDeleteCtrl', [
  '$scope', '$routeParams', '$http',
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
