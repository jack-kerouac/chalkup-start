'use strict';

angular.module('chalkupStartApp')
    .controller('EditSessionCtrl', function ($scope, $stateParams, Restangular, LoadingIndicator) {
        var session = Restangular.one('sessions', $stateParams.id).get();
        LoadingIndicator.waitFor(session);
        $scope.session = session.$object;

        session.then(function (session) {
            var gym = Restangular.one('gyms', session.gym.id).get();
            LoadingIndicator.waitFor(gym);
            $scope.gym = gym.$object;

            gym.then(function(gym) {
                // make image URLs absolute
                _.each(gym.floorPlans, function(floorPlan) {
                    floorPlan.img.url = Restangular.configuration.baseUrl + floorPlan.img.url;
                });

                var boulders = gym.one('boulders').getList();
                LoadingIndicator.waitFor(boulders);
                $scope.boulders = boulders.$object;

                boulders.then(function(boulders) {
                    // make photo URLs absolute
                    _.each(boulders, function(boulder) {
                        if(!_.isUndefined(boulder.photo))
                            boulder.photo.url = Restangular.configuration.baseUrl + boulder.photo.url;
                    });
                });
            });
        });

        $scope.currentBoulder = undefined;

        $scope.select = function (boulder) {
            $scope.currentBoulder = boulder;
        };

        $scope.unselect = function() {
            $scope.currentBoulder = undefined;
        }

    });
