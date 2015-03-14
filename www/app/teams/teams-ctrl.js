(function() {
    'use strict';

    angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', TeamsCtrl]);

    function TeamsCtrl(eliteApi) {
        var vm = this;

        console.log('TeamsCtrl just loaded...');

        eliteApi.getLeagueData().then(function(data) {
            vm.teams = data.teams;
        });
    };
})();