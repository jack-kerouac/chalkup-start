'use strict';

describe('Controller: StatsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('chalkupStartApp'));

  var StatsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatsctrlCtrl = $controller('StatsctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
