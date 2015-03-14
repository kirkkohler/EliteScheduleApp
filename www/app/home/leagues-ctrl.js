(function() {
    'use strict';

    angular.module('eliteApp').controller('LeaguesCtrl', ['$state', 'eliteApi', LeaguesCtrl]);

    function LeaguesCtrl($state, eliteApi) {
        var vm = this;

        eliteApi.getLeagues().then(function(data) {
            vm.leagues = data;
        });

        /*vm.leagues = leagues;

        console.log(vm.leagues);*/

        vm.selectLeague = function(id) {
            eliteApi.setLeagueId(id);
            $state.go("app.teams");
        };
    };
})();