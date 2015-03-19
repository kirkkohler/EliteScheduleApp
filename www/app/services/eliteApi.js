(function() {
    'use strict';

    angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', eliteApi]);

    function eliteApi($http, $q, $ionicLoading, DSCacheFactory) {
        /*var leagues = JSON.parse('[{"leagues": "1"}]');
         var leagueData = JSON.parse('[{"league": {"name": "Spring Fling Tournament 2014"}}]');*/

        /*var currentLeagueId = '';*/

        self.leaguesCache = DSCacheFactory.get("leaguesCache");
        self.leagueDataCache = DSCacheFactory.get("leagueDataCache");

        self.leaguesCache.setOptions({
            onExpire: function(key, value) {
                getLeagues().then(function() {
                    console.log('Leagues Cache was automatically refreshed');
                }, function() {
                    console.log('Error getting data. Putting expired items back in the cache', new Date());
                    self.leaguesCache.put(key, value);
                });
            }
        });

        self.leagueDataCache.setOptions({
            onExpire: function(key, value) {
                getLeagueData().then(function() {
                    console.log('League Data Cache was automatically refreshed');
                }, function() {
                    console.log('Error getting data. Putting expired items back in the cache', new Date());
                    self.leagueDataCache.put(key, value);
                });
            }
        });

        self.staticCache = DSCacheFactory.get("staticCache");

        function setLeagueId(leagueId) {
            self.staticCache.put("currentLeagueId", leagueId);
            console.log('setLeagueId: currentLeagueId', getLeagueId);
        };

        function getLeagueId() {
            console.log('getLeagueId: currentLeagueId', getLeagueId);
            return self.staticCache.get("currentLeagueId");
        };

        /* switch to using promises instead of callbacks */
        function getLeagues() {
            var deferred = $q.defer(),
                cacheKey = "leagues",
                leaguesData = self.leaguesCache.get(cacheKey);

            console.log('Looking for getLeagues...');

            if (leaguesData) {
                console.log('Found data inside cache', leaguesData);
                deferred.resolve(leaguesData);
            } else {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                $http.get('http://elite-schedule.net/api/leaguedata')
                    .success(function(data) {
                        console.log('Received leagueData via HTTP');
                        self.leaguesCache.put(cacheKey, data);
                        deferred.resolve(data);
                        $ionicLoading.hide();
                    })
                    .error(function() {
                        console.log('Error while making HTTP call.');
                        deferred.reject();
                        $ionicLoading.hide();
                    });
            }

            return deferred.promise;
        };
        /*  function getLeagues(callback) {
         $http.get('http://elite-schedule.net/api/leaguedata').success(function(data) {
         callback(data);
         });
         };*/

        function getLeagueData(forceRefresh) {
            if (typeof forceRefresh === 'undefined') {
                forceRefresh = false;
            }

            var deferred = $q.defer(),
                cacheKey = "leagueData-" + getLeagueId(),
                leagueData = null;

            if (!forceRefresh) {
                leagueData = self.leagueDataCache.get(cacheKey)
            };

            console.log('getLeagueData: currentLeagueId', getLeagueId());

            if (leagueData) {
                console.log('Found data inside cache', leagueData);
                deferred.resolve(leagueData);
            } else {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.get('http://elite-schedule.net/api/leaguedata/' + getLeagueId())
                    .success(function(data, status) {
                        console.log('Received schedule data via HTTP.', data, status);
                        self.leagueDataCache.put(cacheKey, data);
                        deferred.resolve(data);
                        $ionicLoading.hide();
                    }).error(function() {
                        console.log('Error while making HTTP call.');
                        deferred.reject();
                        $ionicLoading.hide();
                    });
            }

            return deferred.promise;
        };

        return {
            getLeagues: getLeagues,
            getLeagueData: getLeagueData,
            setLeagueId: setLeagueId
        };
    };
})();