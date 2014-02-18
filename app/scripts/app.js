'use strict';

angular.module('chalkupStartApp', ['ui.router'])
    .run(function ($rootScope, $state) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });

        $rootScope.$state = $state;
    });


angular.module('chalkupStartApp')
    .config(function ($stateProvider, $urlRouterProvider) {

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
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })
    });
