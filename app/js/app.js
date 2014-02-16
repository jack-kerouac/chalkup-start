var app = (function () {

    'use strict';
    var docElem = document.documentElement;

    return {
        userAgentInit: function () {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        }
    };

})();

(function () {

    'use strict';

    //foundation init
    $(document).foundation();

    app.userAgentInit();

    $('.flexslider').flexslider({
        animation: "slide"
    });

    $('#notify form').submit(function (event) {
        var dimensionValue = 'signedUp';

        ga('set', 'dimension1', dimensionValue);

        event.preventDefault();
    });


})();