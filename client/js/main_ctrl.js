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

var RicoApp = angular.module("RicoApp", [ 'ngRoute', 'ngResource' ]);

RicoApp.config([
		'$routeProvider',
		'$locationProvider',
		'$rootScopeProvider',
		function($routeProvider, $locationProvider, $rootScopeProvider) {
			$routeProvider

			.when('/Gui/Users/Login', {
				templateUrl : 'templates/user-login.html',
				controller : 'UsersLoginCtrl'
			}).when('/Gui/Users/Logout', {
				templateUrl : 'templates/user-logout.html',
				controller : 'UsersLogoutCtrl'
			})

			.when('/Gui/Users/:uid/Boards/:bid', {
				templateUrl : 'templates/board-read.html',
				controller : 'BoardReadCtrl',
			})

			.when('/Gui/Users/:uid/Boards/:bid/events/:lid', {
				templateUrl : 'templates/event-read.html',
				controller : 'eventReadCtrl',
			}).when('/Gui/Users/:uid/Boards/:bid/events/:lid/Delete', {
				templateUrl : 'templates/event-delete.html',
				controller : 'eventDeleteCtrl'
			})

			.when('/Gui/Users/:uid/Boards/:bid/events/:lid/cards/Create', {
				templateUrl : 'templates/card-create.html',
				controller : 'cardCreateCtrl'
			}).when('/Gui/Users/:uid/Boards/:bid/events/:lid/cards/:cid', {
				templateUrl : 'templates/card-read.html',
				controller : 'cardReadCtrl',
			}).when('/Gui/Users/:uid/Boards/:bid/events/:lid/cards/:cid/Update',
					{
						templateUrl : 'templates/card-create.html',
						controller : 'cardUpdateCtrl'
					}).when(
					'/Gui/Users/:uid/Boards/:bid/events/:lid/cards/:cid/Delete',
					{
						templateUrl : 'templates/card-delete.html',
						controller : 'cardDeleteCtrl'
					})

			.otherwise({
				redirectTo : '/Gui/Users/Login'
			});
		} ]);

RicoApp.controller('UsersLoginCtrl', [
		'$scope',
		'$location',
		'$rootScope',
		'UserService',
		'BoardService',
		function($scope, $location, $rootScope, UserService, BoardService) {
			$rootScope.user = UserService.login($scope.newuser);

			if (typeof $rootScope.user.id !== "undefined") {
				BoardService.init($rootScope.user);
				$location.path('/Gui/Users/' + $rootScope.user.id + '/Boards/1');
			}

			$scope.login = function() {

				$rootScope.user = UserService.login($scope.newuser);
				if (typeof $rootScope.user.id !== "undefined") {
					BoardService.init($rootScope.user);
					$location.path('/Gui/Users/' + $rootScope.user.id
							+ '/Boards/1');
				} else {
					$scope.message = 'Login error';
				}
			};

		} ]);

RicoApp.controller('UsersLogoutCtrl', [
		'$scope',
		'$location',
		'$rootScope',
		'UserService',
		'BoardService',
		function($scope, $location, $rootScope, UserService, BoardService) {
			$rootScope.user = UserService.login($scope.newuser);
			if (typeof $rootScope.user.id !== "undefined") {
				BoardService.clear();
				UserService.logout();
				$location.path('#');
			}

			$scope.login = function() {

				// console.log($scope.user.username);
				$rootScope.user = UserService.login($scope.newuser);
				if (typeof $rootScope.user.id !== "undefined") {
					BoardService.init($rootScope.user);
					$location.path('/Gui/Users/' + $rootScope.user.id
							+ '/Boards');
				} else {
					console.log("errore login...");
				}
			};

		} ]);

RicoApp.controller('BoardsCtrl', [
		'$scope',
		'$http',
		'$location',
		'$rootScope',
		'BoardService',
		'UserService',
		function($scope, $http, $location, $rootScope, BoardService,
				UserService) {
			// check if is logged in
			$rootScope.$on('$routeChangeStart', function(card, next) {
				if (next.originalPath != "/Gui/Users/Login") {
					$rootScope.user = UserService.login();

					if (typeof $rootScope.user.id === "undefined") {
						$location.path("#");
					}
				}
			});

			$scope.$on('boards:updated', function(card, data) {
				$scope.boards = data;
			});

		}
]);

RicoApp.controller('BoardReadCtrl', [ '$scope', '$routeParams', '$route', '$rootScope', 'EventsRestAPI',
		function($scope, $routeParams, $route, $rootScope, EventsRestAPI) {
			$scope.bid = $routeParams.bid;
			// $scope.board = BoardService.get($scope.bid);
      events = EventsRestAPI.query({}, function(data){
        alert(data)
      })
      $scope.board = {
        id : 1,
        name : 'fuu',
        description : 'test board 01',
        events : events
      }


		}
]);

// TODO convert in "save in Favourites"
RicoApp.controller('eventUpdateCtrl', [
		'$scope',
		'$routeParams',
		'$route',
		'$routeParams',
		'BoardService',
		'$location',
		function($scope, $routeParams, $route, $routeParams, BoardService,
				$location) {
			$scope.newevent = BoardService.getevent($routeParams.bid,
					$routeParams.lid);

			$scope.saveevent = function() {
				var bid = $scope.newevent.board;
				BoardService.saveevent($scope.newevent);
				$scope.newevent = {};
				$location.path('/Gui/Users/:uid/Boards/' + bid);
			};
		} ]);

// TODO convert in "remove from Favourites"
RicoApp.controller('eventDeleteCtrl', [ '$scope', '$routeParams', '$http',
		'BoardService', '$location',
		function($scope, $routeParams, $http, BoardService, $location) {
			$scope.bid = $routeParams.bid;
			$scope.lid = $routeParams.lid;

			$scope.removeevent = function(bid, lid) {
				// console.log(bid + ' ' + lid);
				BoardService.removeevent(bid, lid);
				$location.path('/Gui/Users/:uid/Boards/' + bid);
			};

			$scope.back = function(bid) {
				$location.path('/Gui/Users/:uid/Boards/' + bid);
			};

		} ]);

RicoApp.service('UserService', function() {
	var uid = 3;

	var userLoggedin = {};

	var users = [ {
		id : 1,
		username : 'pippo',
		password : '123',
	}, {
		id : 2,
		username : 'pluto',
		password : '456'
	} ];

	// save method create a new board if not already exists
	// else update the existing object
	this.save = function(user) {
		if (user.id == null) {
			// if this is new board, add it in boards array
			user.id = uid++;
			users.push(user);
		} else {
			// for existing board, find this board using id
			// and update it.
			for (i in users) {
				if (users[i].id == user.id) {
					users[i] = user;
				}
			}
		}

	};

	// simply search users event for given id
	// and returns the board object if found
	this.get = function(id) {
		for (i in users) {
			if (users[i].id == id) {
				return users[i];
			}
		}
	};

	// iterate through users event and delete
	// board if found
	this.remove = function(id) {
		for (i in users) {
			if (users[i].id == id) {
				users.splice(i, 1);
			}
		}
	};

	// simply returns the boards event
	this.event = function() {
		return users;
	};

	this.login = function(user) {
		if (typeof userLoggedin.username !== "undefined")
			return userLoggedin;
		if (!user || !user.username || !user.password)
			return userLoggedin = {};
		for (i in users) {
			if (users[i].username == user.username
					&& users[i].password == user.password) {
				return userLoggedin = users[i];
			}
		}
		return userLoggedin = {};
	};

	this.logout = function(){
		userLoggedin = {};
	}
});

RicoApp.factory("EventsRestAPI", ['$resource', function($resource) {
  return $resource('http://192.168.178.30:8080/events');
  // return $resource('Unknown provider: ngResourceProvider');
  /*, {}, {
    get: { method: 'GET' , isArray: true }
  });*/
}]);

RicoApp.service('BoardService', [ '$rootScope', function($rootScope) {
	// to create unique board id

	var bid = 3;
	var lid = 3;
	var cid = 5;
	var uid = 0;

	var status = [ {
		id : 'open',
		name : 'Open'
	}, {
		id : 'close',
		name : 'Close'
	} ];

	// boards array to hold event of all boards
	var boards = [];

	var user_boards = [ {
		id : 1,
		name : 'fuu',
		description : 'test board 01',
		events : [ {
			id : 1,
			board : 1,
      // TODO change in "title"
			name : "QGIS Tool for Landslide Hazard Assessment",
      subtitle: "faced on the development of openconnect VPN server",
      speakers: [
        'hello', 'world'
      ],
      description: "<p>In Southern Kyrgyzstan, large areas are affected by high landslide activity, which regularly results in casualties and economic losses.</p>",
      start_time: "20150201T090000",
      end_time: "20150201T090500",
      track: "Software defined radio",
      location: "H.1302 (Depage)",
      url: "https:/fosdem.org/2015/schedule/event/openconnect_vpn",
		} ]
	} ];

	this.init = function(user) {
		// load boards of a specific user
		uid = user.id;
		boards = user_boards;

		$rootScope.$broadcast('boards:updated', boards);
		// console.log(boards);
	};

	this.clear = function(){
		boards = [];
		uid = 0;
	}

  // TODO remove
	this.getcard = function(bid, lid, cid) {
		var event = this.getevent(bid, lid);
		for (j in event.cards) {
			if (event.cards[j].id == cid) {
				return event.cards[j];
			}
		}
	};

  // TODO remove
	this.existcard = function(cid, bid, lid) {
		for (i in boards) {
			if (typeof boards[i].events !== "undefined")
				for (j in boards[i].events) {
					if (typeof boards[i].events[j].cards !== "undefined")
						for (k in boards[i].events[j].cards) {
							if (boards[i].events[j].cards[k].id == cid) {
								bid.id = boards[i].id;
								lid.id = boards[i].events[j].id;
								return boards[i].events[j].cards[k];
							}
						}
				}
		}
		return null;
	};

  // TODO remove
	this.removecard = function(bid, lid, cid) {
		var event = this.getevent(bid, lid);
		for (j in event.cards) {
			if (event.cards[j].id == cid)
				event.cards.splice(j, 1);
		}
	};

  // TODO remove
	this.savecard = function(bid, card) {
		var lid = card.event;

		var event = this.getevent(bid, lid);
		if (card.id == null) {
			card.id = cid++;
			event.cards.push(card);
		} else {
			var oldbid = {};
			var oldlid = {};
			var oldcard = this.existcard(card.id, oldbid, oldlid);
			if (oldcard !== null && oldlid.id != card.event) {
				this.removecard(oldbid.id, oldlid.id, oldcard.id);
				event.cards.push(card);
			} else {
				for (j in event.cards) {
					if (event.cards[j].id == card.id) {
						event.cards[j] = card;
					}
				}
			}
		}
	};

	this.saveevent = function(event) {
		var bid = event.board;
		board = this.get(bid);
		if (event.id == null) {
			event.id = lid++;
			board.events.push(event);
		} else {
			for (j in board.events) {
				if (board.events[j].id == event.id) {
					board.events[j] = event;
				}
			}
		}
	};

	this.getStatus = function() {
		return status;
	};

	this.getevents = function(bid) {
		return this.get(bid).events;
	};

	this.getevent = function(bid, lid) {
		var board = this.get(bid);
		for (j in board.events) {
			if (board.events[j].id == lid) {
				if (typeof board.events[j].cards === "undefined")
					board.events[j].cards = [];

				return board.events[j];
			}
		}
	};

	this.removeevent = function(bid, lid) {
		var board = this.get(bid);
		for (j in board.events) {
			if (board.events[j].id == lid)
				board.events.splice(j, 1);
		}
	};

	// save method create a new board if not already exists
	// else update the existing object
	this.save = function(board) {
		if (board.id == null) {
			// if this is new board, add it in boards array
			board.id = bid++;
			boards.push(board);
		} else {
			// for existing board, find this board using id
			// and update it.
			for (i in boards) {
				if (boards[i].id == board.id) {
					boards[i] = board;
				}
			}
		}

	};

	// simply search boards event for given id
	// and returns the board object if found
	this.get = function(id) {
		for (i in boards) {
			if (boards[i].id == id) {
				if (typeof boards[i].events === "undefined")
					boards[i].events = [];

				return boards[i];
			}
		}
	};

	// iterate through boards event and delete
	// board if found
	this.remove = function(id) {
		for (i in boards) {
			if (boards[i].id == id) {
				boards.splice(i, 1);
			}
		}
	};

	// simply returns the boards event
	this.event = function() {
		return boards;
	};
} ]);
