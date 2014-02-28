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

        var LOGIN_STATUS_CHANGE = 'loginStatusChange';

        this.$get = function ($rootScope, $http, $q, $state, LoadingIndicator, Restangular) {
            var config = {};

            var updateCurrentUser = function (user) {
                config.current = user;
                $rootScope.$broadcast(LOGIN_STATUS_CHANGE, {
                    loggedIn: !_.isUndefined(user),
                    currentUser: user
                });
            };

            config.current = undefined;

            config.onLoginStatusChange = function ($scope, handler) {
                $scope.$on(LOGIN_STATUS_CHANGE, function (event, args) {
                    handler(args.loggedIn, args.currentUser);
                });
            };

            config.isLoggedIn = function () {
                return !_.isUndefined(config.current);
            };

            config.login = function (credentials) {
                var loggedIn = $q.defer();
                var loginPost = $http({
                    method: 'POST',
                    url: loginUrl,
                    data: credentials
                }).success(function (data, status) {
                        if (data.loggedIn) {
                            var userGet = Restangular.one('users', data.userId).get();
                            LoadingIndicator.waitFor(userGet);
                            userGet.then(function (user) {
                                updateCurrentUser(user);
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
            };

            config.logout = function () {
                var loggedOut = $q.defer();

                var logoutPost = $http({
                    method: 'POST',
                    url: logoutUrl
                }).success(function (data, status) {
                        if (!data.loggedIn) {
                            updateCurrentUser(undefined);
                            loggedOut.resolve('logout successful');

                            $state.go('start', null, {reload: true});
                        }
                        else {
                            loggedOut.reject('login unsucessful');
                        }
                    }).error(function (data, status) {
                        // login was not successful
                        loggedOut.reject('login unsucessful');
                    });

                LoadingIndicator.waitFor(logoutPost);

                return loggedOut.promise;
            };

            config.init = function () {
                $rootScope.user = config;

                var loginStatusGet = $http({
                    method: 'GET',
                    url: loginStatusUrl
                }).success(function (data, status) {
                        if (data.loggedIn) {
                            var userGet = Restangular.one('users', data.userId).get();
                            LoadingIndicator.waitFor(userGet);
                            userGet.then(function (user) {
                                updateCurrentUser(user);
                            });
                        } else {
                            updateCurrentUser(undefined);
                        }
                    });
                LoadingIndicator.waitFor(loginStatusGet);
            };

            return config;
        }
    });