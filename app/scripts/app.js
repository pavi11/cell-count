'use strict';

/**
 * @ngdoc overview
 * @name fluteJsApp
 * @description
 * # fluteJsApp
 *
 * Main module of the application.
 */
angular
	.module('UIApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
	.config(function ($routeProvider) {
		$routeProvider
			.when("/train", {
				templateUrl: 'views/train.html',
				controller: "trainCtrl"
			})
			.when("/test", {
				templateUrl: 'views/test.html',
				controller: "testCtrl"
			})
			.otherwise({
				redirectTo: '/train'
			});
	});
