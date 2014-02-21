'use strict';

angular.module('chalkupStartApp')
    .controller('EditSessionCtrl', function ($scope, $stateParams, $state, Restangular, LoadingIndicator) {

        var session = Restangular.one('sessions', $stateParams.id).get();
        LoadingIndicator.waitFor(session);
        $scope.session = session.$object;

        session.then(function (session) {
            var gym = Restangular.one('gyms', session.gym.id).get();
            LoadingIndicator.waitFor(gym);
            $scope.gym = gym.$object;

            gym.then(function (gym) {
                // make image URLs absolute
                _.each(gym.floorPlans, function (floorPlan) {
                    floorPlan.img.url = Restangular.configuration.baseUrl + floorPlan.img.url;
                });

                var boulders = gym.one('boulders').getList();
                LoadingIndicator.waitFor(boulders);
                $scope.gym.boulders = boulders.$object;

                boulders.then(function (boulders) {
                    // make photo URLs absolute
                    _.each(boulders, function (boulder) {
                        if (!_.isUndefined(boulder.photo))
                            boulder.photo.url = Restangular.configuration.baseUrl + boulder.photo.url;
                    });
                });
            });
        });

        $scope.activeTab = 'floor-plan';


        $scope.currentBoulder = undefined;

        $scope.select = function (boulder) {
            $scope.currentBoulder = boulder;
            $scope.activeTab = 'floor-plan';
        };

        $scope.unselect = function () {
            $scope.currentBoulder = undefined;
        };


        $scope.boulder = function (id) {
            return _.find($scope.gym.boulders, function (boulder) {
                return boulder.id === id;
            });
        }

        // CONFIGURE ASCENT

        $scope.currentAscent = {};

        function getOrCreate(session, boulder) {
            var ascent = _.find(session.ascents, function (ascent) {
                return ascent.boulder === boulder.id;
            });
            if (_.isUndefined(ascent))
                return { boulder: boulder.id, style: "none" };
            else
                return ascent;
        }

        $scope.$watch('currentBoulder', function (currentBoulder) {
            if (_.isUndefined(currentBoulder))
                $scope.currentAscent = undefined;
            else
                $scope.currentAscent = getOrCreate($scope.session, currentBoulder);
        });


        function addAscent(session, ascent) {
            if (!_.contains(session.ascents, ascent))
                session.ascents.push(ascent);
        }

        function removeAscent(session, ascent) {
            if (_.contains(session.ascents, ascent)) {
                _.pull(session.ascents, ascent);
            }
        }

        $scope.$watch('currentAscent.style', function (style) {
            if (_.isUndefined(style))
                return;

            if (style === 'none')
                removeAscent($scope.session, $scope.currentAscent);
            else
                addAscent($scope.session, $scope.currentAscent);
        });


        // SAVE SESSION

        $scope.$on('SAVE-SESSION', function(event) {
            var update = $scope.session.put();
            LoadingIndicator.waitFor(update);
            update.then(function() {
                $state.go('stats');
            });
        });


        // DELETE SESSION

        $scope.$on('DELETE-SESSION', function(event) {
            var deleteSession = $scope.session.remove();
            LoadingIndicator.waitFor(deleteSession);
            deleteSession.then(function() {
                $state.go('stats');
            });
        });

    });
