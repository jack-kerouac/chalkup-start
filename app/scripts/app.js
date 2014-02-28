'use strict';

angular.module('chalkupStartApp', ['ui.router', 'restangular', 'angularSpinner', 'angularMoment', 'mm.foundation', 'angulartics', 'angulartics.google.analytics']);

angular.module('chalkupStartApp')
    .run(function ($window, $rootScope, $state, userService, CAN_LOGIN) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });

        $rootScope.$state = $state;

        $rootScope.canLogin = CAN_LOGIN;

        $window.moment.lang('de');

        userService.init();
    });