'use strict';

/**
 * @ngdoc function
 * @name gistListingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gistListingApp
 */
angular.module('gistListingApp')
  .controller('MainCtrl', function ($scope, $rootScope, $window, $location,$timeout,$interval,$http, apiService, AppConfig) {
  	console.info('Main Controller initialized');
  	$scope.allGist = [];
  	$scope.ui = {
  		showList : true,
  		showDetails: false
  	};

  	function getGistList(username){
  		$scope.list = apiService.getAllGist(AppConfig.BASE_URL + AppConfig.USERS + "/" + username + AppConfig.GIST, null);
  		apiService.getAllGist(AppConfig.BASE_URL + AppConfig.USERS + "/" + username + AppConfig.GIST, null).then(function(data, status, headers){
        	$scope.allGist = data.data;
        	console.log($scope.allGist)
    	})
    }

    $scope.searchClicked = function(){
    	console.log($scope.ui.username);
    	getGistList($scope.ui.username)	
    }

    $scope.openGistDetails = function(id){
    	$scope.ui.showList = false;
    	$scope.ui.showDetails = true;
    }

    $scope.backToList = function(){
    	$scope.ui.showList = true;
    	$scope.ui.showDetails = false;
    }
  });
