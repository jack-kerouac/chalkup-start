'use strict';

angular.module('chalkupStartApp')
    .provider('userService', function () {
        var loginUrl;
        this.setLoginUrl = function (url) {
            loginUrl = url;
        };

        var logoutUrl;
        this.setLogoutUrl = function (url) {
            logoutUrl = url;
        };

        var loginStatusUrl;
        this.setLoginStatusUrl = function (url) {
            loginStatusUrl = url;
        };

        this.$get = function ($rootScope, $http, $q, $state, LoadingIndicator, Restangular) {
            return {
                current: undefined,
                login: function (credentials) {
                    var loggedIn = $q.defer();
                    var service = this;
                    var loginPost = $http({
                        method: 'POST',
                        url: loginUrl,
                        data: credentials
                    }).success(function (data, status) {
                            if (data.loggedIn) {
                                var userGet = Restangular.one('users', data.userId).get();
                                LoadingIndicator.waitFor(userGet);
                                userGet.then(function (user) {
                                    service.current = user;
                                    loggedIn.resolve(user);
                                }).catch(function () {
                                        loggedIn.reject('getting logged in user unsuccessful');
                                    });
                            } else {
                                loggedIn.reject('login unsucessful');
                            }
                        }).error(function (data, status) {
                            loggedIn.reject('login unsucessful');
                        });
                    LoadingIndicator.waitFor(loginPost);

                    return loggedIn.promise;
                },
                logout: function () {
                    var loggedOut = $q.defer();
                    var service = this;

                    var logoutPost = $http({
                        method: 'POST',
                        url: logoutUrl
                    }).success(function (data, status) {
                            if (!data.loggedIn) {
                                service.current = undefined;
                                loggedOut.resolve('logout successful');
                            }
                            else {
                                loggedOut.reject('login unsucessful');
                            }
                        }).error(function (data, status) {
                            // login was not successful
                            loggedOut.reject('login unsucessful');
                        });

                    LoadingIndicator.waitFor(logoutPost);

                    $state.go('start');

                    return loggedOut.promise;
                },
                init: function () {
                    var service = this;
                    $rootScope.user = service;

                    var loginStatusGet = $http({
                        method: 'GET',
                        url: loginStatusUrl
                    }).success(function (data, status) {
                            if (data.loggedIn) {
                                var userGet = Restangular.one('users', data.userId).get();
                                LoadingIndicator.waitFor(userGet);
                                service.current = userGet.$object;
                            } else {
                                service.current = undefined;
                            }
                        });
                    LoadingIndicator.waitFor(loginStatusGet);
                }
            }
        }
    });