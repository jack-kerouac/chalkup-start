'use strict';

angular.module('chalkupStartApp')
    .controller('EditSessionCtrl', function ($scope, $rootScope, $stateParams, $state, $timeout, $analytics, Restangular, LoadingIndicator, navBarService, feedbackService) {
        navBarService.addMenuItem({
            label: 'Session löschen',
            action: function () {
                var deleteSession = $scope.session.remove();
                LoadingIndicator.waitFor(deleteSession);
                deleteSession.then(function () {
                    $analytics.eventTrack('sessionDeletion', {});
                    $state.go('stats');
                });
            }
        });
        navBarService.addMenuItem({
            label: 'Feedback',
            action: function() {
                feedbackService.openFeedbackPanel();
            }
        });
        navBarService.addMenuItem({
            label: 'Abmelden',
            action: function () {
                $scope.user.logout();
            }
        });

        navBarService.addButton({
            icon: 'x',
            state: 'stats'
        });
        navBarService.addButton({
            icon: 'check',
            action: function () {
                var update = $scope.session.put();
                LoadingIndicator.waitFor(update);
                update.then(function () {
                    $analytics.eventTrack('sessionUpdate', {});
                    $state.go('stats');
                });
            }
        });


        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // broadcast later after the body state attribute is updated to the current state name
            $timeout(function () {
                $scope.$broadcast('cu-imageMap:resize')
            }, 0);
        });


        var session = Restangular.one('sessions', $stateParams.id).get();
        LoadingIndicator.waitFor(session);
        $scope.session = session.$object;

        session.then(function (session) {
            var gym = Restangular.one('gyms', session.gym.id).get();
            LoadingIndicator.waitFor(gym);
            $scope.gym = gym.$object;

            gym.then(function (gym) {
                var boulders = gym.one('boulders').getList();
                LoadingIndicator.waitFor(boulders);
                $scope.gym.boulders = boulders.$object;
            });
        });

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

        $scope.currentAscent = undefined;

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

        $scope.removeAscent = function(ascent) {
            removeAscent($scope.session, ascent);
            if($scope.currentAscent === ascent)
                $scope.currentAscent.style = 'none';
        };

        $scope.$watch('currentAscent.style', function (style) {
            if (_.isUndefined(style))
                return;

            if (style === 'none')
                removeAscent($scope.session, $scope.currentAscent);
            else
                addAscent($scope.session, $scope.currentAscent);
        });

    });
