'use strict';

angular.module('chalkupStartApp')
    .service('LoadingIndicator', function LoadingIndicator($rootScope) {
        var waitQueue = [];
        this.waitFor = function (promise) {
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
