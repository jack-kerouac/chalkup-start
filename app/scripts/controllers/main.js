'use strict';

angular.module('chalkupStartApp')
    .controller('MainCtrl', function ($scope) {

        $('.flexslider').flexslider({
            animation: "slide"
        });

        $('#notify form').submit(function (event) {
            var dimensionValue = 'signedUp';

            ga('set', 'dimension1', dimensionValue);

            event.preventDefault();
        });

    });
