'use strict';

describe('Service: LoadingIndicator', function () {

  // load the service's module
  beforeEach(module('chalkupStartApp'));

  // instantiate service
  var Loadingindicator;
  beforeEach(inject(function (_Loadingindicator_) {
    Loadingindicator = _Loadingindicator_;
  }));

  it('should do something', function () {
    expect(!!Loadingindicator).toBe(true);
  });

});
