
angular.module('chalkupStartApp')
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, userServiceProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('start', {
                url: "/",
                templateUrl: "views/start.html",
                controller: 'StartCtrl'
            })
            .state('stats', {
                url: "/stats",
                templateUrl: "views/stats.html",
                controller: 'StatsCtrl'
            })
            .state('create-session', {
                url: "/createSession",
                templateUrl: "views/create-session.html",
                controller: 'CreateSessionCtrl'
            })
            .state('edit-session', {
                url: "/editSession?id",
                templateUrl: "views/edit-session.html",
                controller: 'EditSessionCtrl'
            });


        // send Cookie along with the CORS AJAX requests
        $httpProvider.defaults.withCredentials = true;

        var host = 'http://demo.chalkup.de';

        RestangularProvider.setBaseUrl(host + '/rest/v1');

        userServiceProvider.setLoginUrl(host + '/loginOrRegister');
        userServiceProvider.setLogoutUrl(host + '/j_spring_security_logout');
        userServiceProvider.setLoginStatusUrl(host + '/loginStatus');
    });
