/*global angular: true*/
'use strict';
var angular = require('angular');

angular.module('volusion.controllers', ['ngSanitize', 'ui.router', 'volusion.services']);
angular.module('volusion.directives', []);
angular.module('volusion.filters', ['volusion.services']);
angular.module('volusion.services', ['ngCookies', 'ngResource', 'pascalprecht.translate', 'services.config']);

angular.module('volusionApp', [
    'ui.router',
    'seo',
    'services.config',
    require('../bower_components/vn-meta-tags').name,
    require('../bower_components/vn-bem').name,
    // volusion modules
    'volusion.controllers',
    'volusion.directives',
    'volusion.filters',
    'volusion.services'
  ]);

angular.module('volusionApp')
  .config(function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $windowProvider,
    translateProvider,
    config) {

    var env = config.ENV;

    $locationProvider.html5Mode(true);

    var translateOptions = {
      urlPrefix: env.URL_PREFIX || '',
      region: env.REGION,
      lang: env.LANG,
      country: env.COUNTRY,
      disableTranslations: env.DISABLE_TRANSLATIONS
    };
    translateProvider.configure(translateOptions);

    $urlRouterProvider.when('/', ['$state', function($state) {
      $state.go('i18n.home', translateOptions, { location: 'replace' });
    }]);

    $urlRouterProvider.otherwise(function() {
      $windowProvider.$get().location.replace('/404.html');
    });

    $stateProvider
      .state('i18n', {
        url: translateOptions.urlPrefix,
        templateUrl: 'views/i18n.html',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('index');
          }]
        }
      })
      .state('i18n.home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('home');
          }]
        }
      })
      .state('i18n.style-guide', {
        url: '/style-guide',
        templateUrl: 'views/style-guide.html',
        controller: 'StyleGuideCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('style-guide');
          }]
        }
      })
      .state('i18n.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('about');
          }]
        }
      })
      .state('i18n.contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('contact');
          }]
        }
      })
      .state('i18n.articles', {
        url: '/:slug',
        controller: 'ArticleCtrl',
        template: '<article class="container" data-ng-include="templateUrl"></article>',
        resolve: {
          article: ['api', '$stateParams',
            function(api, $stateParams) {
              return api.articles.get({ slug: $stateParams.slug });
            }
          ]
        }
      });
  })
  .run(function($templateCache, $rootScope, cacheBustFilter, $window) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error.status === 404) {
        $window.location.replace('/404.html');
      }
    });

    $templateCache.put('views/i18n.html', require('./views/i18n.html'));
    $templateCache.put('views/home.html', require('./views/home.html'));
    $templateCache.put('views/style-guide.html', require('./views/style-guide.html'));
    $templateCache.put('views/about.html', require('./views/about.html'));
    $templateCache.put('views/contact.html', require('./views/contact.html'));
    $rootScope.overridesCSS = cacheBustFilter('/styles/overrides.css');
  });
