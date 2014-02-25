'use strict';

angular.module('chalkupStartApp')
    .factory('navBarService', function LoadingIndicator($rootScope) {
        function clearNavBar() {
            $rootScope.navBar = {
                menu: [],
                buttons: []
            };
        }

        function closeMenu() {
            $rootScope.$broadcast('cu-navBar:closeMenu');
        }

        // initialize data structure
        clearNavBar();

        $rootScope.$on('$stateChangeStart', function() {
            clearNavBar();
            closeMenu();
        })

        var config = {
            addMenuItem: function(item) {
                $rootScope.navBar.menu.push(item);
            },
            addButton: function(button) {
                $rootScope.navBar.buttons.push(button);
            },
            clearNavBar: clearNavBar,
            closeMenu: closeMenu
        };

        return config;
    });
