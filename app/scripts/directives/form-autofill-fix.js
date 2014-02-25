'use strict';

// taken from http://victorblog.com/2014/01/12/fixing-autocomplete-autofill-on-angularjs-form-submit/
angular.module('chalkupStartApp')
    .directive('formAutofillFix', function ($timeout) {
        return function (scope, elem, attrs) {
            // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
            elem.prop('method', 'POST');

            // Fix autofill issues where Angular doesn't know about autofilled inputs
            $timeout(function() {
                elem.find('input, textarea, select').each(function() {
                    if(!_.isEmpty($(this).val())) {
                        $(this).trigger('input').trigger('change').trigger('keydown');
                    }
                });
            }, 500);
        };
    });