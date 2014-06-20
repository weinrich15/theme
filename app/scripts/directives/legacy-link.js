'use strict';

angular.module('volusion.directives').directive('legacyLink', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr({
        href: attrs.legacyLink,
        target: element.attr('target') || '_self'
      });
    }
  };
}]);
