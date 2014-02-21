'use strict';

angular.module('chalkupStartApp')
    .controller('CreateSessionCtrl', function ($scope, $state, LoadingIndicator, Restangular) {
        $scope.session = {
            date: moment().format('YYYY-MM-DD'),
            ascents: [],
            boulderer: $scope.user.id
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
                $state.go('edit-session', {id: sessionPost.id});
            });
        }
    });
