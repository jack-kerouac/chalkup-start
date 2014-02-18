'use strict';

describe('Directive: gradeChart', function () {

  // load the directive's module
  beforeEach(module('chalkupStartApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<grade-chart></grade-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gradeChart directive');
  }));
});
