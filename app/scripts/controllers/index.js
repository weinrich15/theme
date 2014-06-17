'use strict';

angular.module('volusion.controllers').controller('IndexCtrl', [
  '$rootScope',
  '$scope',
  '$state',
  'api',
  function(
    $rootScope,
    $scope,
    $state,
    api
  ) {

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      }
    });

    // Config
    api.config.get().then(function(response) {
      $scope.config = response.data;
      $rootScope.seo = $rootScope.seo || $scope.config.seo;
      // TODO: REMOVE
      console.log('Config: ', response.data);
    }, function(error) {
      console.log('Error: ', error);
    });
  }
]);
