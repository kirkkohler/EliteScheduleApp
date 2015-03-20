(function() {
    'use strict';

    angular.module('eliteApp').controller('LocationMapCtrl', ['$stateParams', 'eliteApi', LocationMapCtrl]);

    function LocationMapCtrl($stateParams, eliteApi) {
        var vm = this;

        vm.locationId = Number($stateParams.id);

        vm.map = {
            center: {
                latitude: 38.897677,
                longitude: -77.036530
            },
            zoom: 12
        };

        vm.marker = {};

        eliteApi.getLeagueData().then(function(data) {
            vm.location = _.find(data.locations, {
                id: vm.locationId
            });

            vm.marker = {
                idKey: vm.locationId,
                latitude: 38.897677,
                longitude: -77.036530,
                showWindow: true,
                options: {
                    label: vm.location.name + "<br/>(Tap for directions)"
                }
            };

            console.log('vm.location = ' + vm.location + ' idKey= ' + vm.marker.idKey);
            vm.map.center.latitude = vm.location.latitude;
            vm.map.center.longitude = vm.location.longitude;
        });

        vm.locationClicked = function(marker) {
            window.location = "geo: " + marker.latitude + "," + marker.longitude + ";u=35";
        }
    };
})();