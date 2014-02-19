'use strict';

describe('Controller: EditSessionCtrl', function () {

  // load the controller's module
  beforeEach(module('chalkupStartApp'));

  var EditSessionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditSessionCtrl = $controller('EditSessionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
