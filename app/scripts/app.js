'use strict';

angular.module('chalkupStartApp', [])
    .run(function ($rootScope) {
        // foundation init when displaying view/include
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $(document).foundation();
        });
    });
