'use strict';

angular.module('volusion.controllers').controller('IndexCtrl', [
  '$rootScope',
  '$scope',
  '$state',
  'api',
  'tokenGenerator',
  function(
    $rootScope,
    $scope,
    $state,
    api,
    tokenGenerator
  ) {

    $rootScope.seo = {};

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      }
    });

    $scope.global = {
      cart: {
        itemCount: 10
      }
    };

    $rootScope.viewCart = function () {
      if ($rootScope.isInDesktopMode) {
        return '/shoppingcart.asp';
      } else {
        return '/checkout.asp';
      }
    };

    this.getConfig = function (callbackFn) {
      // Config
      api.config.get(tokenGenerator.getCacheBustingToken()).then(function (response) {
        $scope.config = response.data;
        $rootScope.seo = $rootScope.seo || $scope.config.seo;

        // TODO: REMOVE
        console.log('Config: ', response.data);

        if (callbackFn) {
          callbackFn($scope.config.checkout.cartId);
        }

      }, function (error) {

        console.log('Error: ', error);

      });
    };

    this.getCart = function (cartId) {
      // Carts
      api.carts.get({ cartId: cartId })
        .then(function (response) {
          $scope.cart = response.data;
          // TODO: REMOVE
          console.log('Cart: ', response.data);
        }, function (error) {
          console.log('Error: ', error);
        });
    };

    this.getConfig(this.getCart);

  }
]);
