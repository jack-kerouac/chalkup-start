'use strict';

angular.module('chalkupStartApp')
    .service('LoadingIndicator', function LoadingIndicator($rootScope) {
        var waitQueue = [];

        function removeFromQueue(promise) {
            // remove this promise
            var index = waitQueue.indexOf(promise);
            waitQueue.splice(index, 1);
            if (_.isEmpty(waitQueue))
                $rootScope.loading = false;
        }

        this.waitFor = function (promise) {
            $rootScope.loading = true;

            waitQueue.push(promise);
            promise.then(function (data) {
                removeFromQueue(promise);
            }, function (data) {
                removeFromQueue(promise);
                alert(data.config.method + " to " + data.config.url + " returned with " + data.status);
            });
        }
    });
