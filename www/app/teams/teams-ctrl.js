(function() {
    'use strict';

    angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', '$scope', TeamsCtrl]);

    function TeamsCtrl(eliteApi, $scope) {
        var vm = this;

        console.log('TeamsCtrl just loaded...');

        vm.loadList = function(forceRefresh) {
            eliteApi.getLeagueData(forceRefresh).then(function(data) {
                vm.teams = data.teams;
            }).finally(function() {
            	$scope.$broadcast('scroll.refreshComplete');
            });
        };

        vm.loadList(false);
    };
})();