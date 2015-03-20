// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('eliteApp', ['ionic', 'angular-data.DSCacheFactory', 'uiGmapgoogle-maps'])
    .run(function($ionicPlatform, DSCacheFactory) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            DSCacheFactory("leagueDataCache", {
                storageMode: "localStorage",
                maxAge: 60000,
                deleteOnExpire: "aggressive"
            });
            DSCacheFactory("leaguesCache", {
                storageMode: "localStorage",
                maxAge: 60000,
                deleteOnExpire: "aggressive"
            });
            DSCacheFactory("myTeamsCache", {
                storageMode: "localStorage"
            });
            DSCacheFactory("staticCache", {
                storageMode: "localStorage"
            });
        });
    })

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "app/home/home.html"
        })
        .state('home.leagues', {
            url: "/leagues",
            views: {
                "tab-leagues": {
                    controller: 'LeaguesCtrl as vm',
                    templateUrl: "app/home/leagues.html"
                }
            }
        })
        .state('home.myteams', {
            url: "/myteams",
            views: {
                "tab-myteams": {
                    controller: 'MyTeamsCtrl as vm',
                    templateUrl: "app/home/myteams.html"
                }
            }
        })
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: "app/layout/menu-layout.html"
        })
        .state('app.teams', {
            url: "/teams",
            views: {
                "mainContent": {
                    controller: 'TeamsCtrl as vm',
                    templateUrl: "app/teams/teams.html"
                }
            }
        })
        .state('app.team-detail', {
            url: "/teams/:id",
            views: {
                "mainContent": {
                    controller: 'TeamDetailCtrl as vm',
                    templateUrl: "app/teams/team-detail.html"
                }
            }
        })
        .state('app.game', {
            url: "/game/:id",
            views: {
                "mainContent": {
                    controller: "GameCtrl as vm",
                    templateUrl: "app/game/game.html"
                }
            }
        })
        .state('app.standings', {
            url: "/standings",
            views: {
                "mainContent": {
                    controller: "StandingsCtrl as vm",
                    templateUrl: "app/standings/standings.html"
                }
            }
        })
        .state('app.locations', {
            url: "/locations",
            views: {
                "mainContent": {
                    controller: "LocationsCtrl as vm",
                    templateUrl: "app/locations/locations.html"
                }
            }
        })
        .state('app.location-map', {
            url: "/location-map/:id",
            views: {
                "mainContent": {
                    
                    templateUrl: "app/locations/location-map.html"
                }
            }
        })
        .state('app.rules', {
            url: "/rules",
            views: {
                "mainContent": {
                    templateUrl: "app/rules/rules.html"
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/locations');
});