'use strict';

angular.module('chalkupStartApp')
    .provider('userService', function () {
        var loginUrl;
        this.setLoginUrl = function (url) {
            loginUrl = url;
        };

        this.$get = function ($http, $q, LoadingIndicator, Restangular) {
            var loggedIn = $q.defer();
            return {
                current: undefined,
                login: function (credentials) {
                    var service = this;
                    $http({
                        method: 'POST',
                        url: loginUrl,
                        data: credentials
                    }).success(function (data, status) {
                            if(data.loggedIn) {
                                var userGet = Restangular.one('users', data.userId).get();
                                LoadingIndicator.waitFor(userGet);
                                userGet.then(function(user) {
                                    service.current = user;
                                    loggedIn.resolve(user);
                                }).catch(function() {
                                    loggedIn.reject('getting logged in user unsuccessful');
                                });
                            }
                        }).error(function(data, status) {
                            // login was not successful
                            loggedIn.reject('login unsucessful');
                        });

                    return loggedIn.promise;
                }
            }
        }
    });