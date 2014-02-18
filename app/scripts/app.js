'use strict';

angular.module('chalkupStartApp', ['ui.router', 'restangular', 'angularSpinner'])
    .run(function ($rootScope, $state) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });

        $rootScope.$state = $state;

        var waitQueue = [];
        $rootScope.waitFor = function (promise) {
            $rootScope.loading = true;

            waitQueue.push(promise);
            promise.then(function () {
                // remove this promise
                var index = waitQueue.indexOf(promise);
                waitQueue.splice(index, 1);
                if (_.isEmpty(waitQueue))
                    $rootScope.loading = false;
            });
        }
    });


angular.module('chalkupStartApp')
    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('start', {
                url: "/",
                templateUrl: "views/start.html",
                controller: 'StartCtrl'
            })
            .state('stats', {
                url: "/stats",
                templateUrl: "views/stats.html",
                controller: 'StatsCtrl'
            })

        RestangularProvider.setBaseUrl('http://demo.chalkup.de')
    });
