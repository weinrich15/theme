'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: legacyHref', function() {

  // load the directive's module
  beforeEach(module('volusion.directives'));

  var scope;
  var compile;

  function createLegacyHref(attrs) {
    var element = angular.element('<a/>').attr(angular.extend({
      'data-legacy-href': '/foo'
    }, attrs || {}));
    return compile(element)(scope);
  }

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('assigns the value to the href', function() {
    expect(createLegacyHref()).to.have.attr('href', '/foo');
  });

  it('assigns _self to the target, only if it doesn\'t already exist', function() {
    expect(createLegacyHref()).to.have.attr('target', '_self');
    expect(createLegacyHref({ target: '_blank' })).to.have.attr('target', '_blank');
  });

});
