'use strict';

angular.module('chalkupStartApp', []);



// TODO: where to put the following?

(function () {

    //foundation init
    $(document).foundation();

    $('.flexslider').flexslider({
        animation: "slide"
    });

    $('#notify form').submit(function (event) {
        var dimensionValue = 'signedUp';

        ga('set', 'dimension1', dimensionValue);

        event.preventDefault();
    });

})();