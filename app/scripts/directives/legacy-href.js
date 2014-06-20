'use strict';

angular.module('volusion.directives').directive('legacyHref', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr({
        href: attrs.legacyHref,
        target: element.attr('target') || '_self'
      });
    }
  };
}]);
