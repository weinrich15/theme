'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: legacyLink', function() {

  // load the directive's module
  beforeEach(module('volusion.directives'));

  var scope;
  var compile;

  function createLegacyLink(attrs) {
    var element = angular.element('<a/>').attr(angular.extend({
      'data-legacy-link': '/foo'
    }, attrs || {}));
    return compile(element)(scope);
  }

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('assigns the value to the href', function() {
    expect(createLegacyLink()).to.have.attr('href', '/foo');
  });

  it('assigns _self to the target, only if it doesn\'t already exist', function() {
    expect(createLegacyLink()).to.have.attr('target', '_self');
    expect(createLegacyLink({ target: '_blank' })).to.have.attr('target', '_blank');
  });

});
