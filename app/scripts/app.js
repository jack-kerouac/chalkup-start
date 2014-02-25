'use strict';

angular.module('chalkupStartApp', ['ui.router', 'restangular', 'angularSpinner', 'angularMoment']);

angular.module('chalkupStartApp')
    .run(function ($window, $rootScope, $state, userService) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });

        $rootScope.$state = $state;

        $window.moment.lang('de');

        userService.init();
    });