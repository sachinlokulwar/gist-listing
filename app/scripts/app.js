'use strict';

/**
 * @ngdoc overview
 * @name gistListingApp
 * @description
 * # gistListingApp
 *
 * Main module of the application.
 */
angular
  .module('gistListingApp', [
    'ngCookies',
    'ngRoute',
    'ngResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant('AppConfig', {
    'BASE_URL': 'https://api.github.com',
    'GIST' : '/gists',
    'USERS': '/users'
  });
