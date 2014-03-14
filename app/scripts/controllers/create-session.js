'use strict';

angular.module('chalkupStartApp')
    .controller('CreateSessionCtrl', function ($scope, $state, $analytics, LoadingIndicator, Restangular, navBarService) {
        navBarService.addButton({
            icon: 'x',
            state: 'stats'
        });

        $scope.session = {
            date: moment().format('YYYY-MM-DD'),
            ascents: [],
            boulderer: $scope.user.current.id
        };

        var gyms = Restangular.all('gyms').getList();
        LoadingIndicator.waitFor(gyms);

        gyms.then(function (gyms) {
            $scope.gyms = gyms;
            $scope.session.gym = gyms[0];
        });

        $scope.logSession = function () {
            var sessionPost = Restangular.all('sessions').post($scope.session);
            LoadingIndicator.waitFor(sessionPost);

            sessionPost.then(function(sessionPost) {
                $analytics.eventTrack('sessionCreation', {});

                $state.go('recommendations', {id: sessionPost.id});
            });
        }
    });
