'use strict';

angular.module('chalkupStartApp', ['ui.router'])
    .run(function ($rootScope) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });
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
    });
