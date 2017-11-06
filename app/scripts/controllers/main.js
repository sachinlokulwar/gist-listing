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
  	$scope.gistForkDetails = [];
  	$scope.tags = [];
  	$scope.ui = {
  		showList : true,
  		showDetails: false,
  		username: '',
  		reverse: true,
  		sort: 'id',
  		sortDirection: 'descending',
  		searchGist: false,
  		currentTag: '',
  		apiHits: window.localStorage.getItem('apiHitCount')
  	};

  	function getGistList(username){

  		$scope.ui.searchGist = true;
  		var count = window.localStorage.getItem('apiHitCount');
  		if(count){
  			window.localStorage.setItem('apiHitCount', parseInt(count) + 1);
  			$scope.ui.apiHits = parseInt(count) + 1;
  		}
  		else{
  			window.localStorage.setItem('apiHitCount', 1);
  			$scope.ui.apiHits = parseInt(count);
  		}
  		apiService.getAllGist(AppConfig.BASE_URL + AppConfig.USERS + "/" + username + AppConfig.GIST, null).then(function(data, status, headers){
        	$scope.allGist = [];
        	for(var gist in data.data){
        		var gistObj = {
        			url: data.data[gist].url,
        			id: data.data[gist].id,
        			created_at: data.data[gist].created_at,
        			updated_at: data.data[gist].updated_at,
        			description: data.data[gist].description,
        			owner: data.data[gist].owner
        		}
        		for(var file in data.data[gist].files){
        			if($scope.tags.indexOf(data.data[gist].files[file].language) == -1){
        				if(data.data[gist].files[file].language){
        					$scope.tags.push(data.data[gist].files[file].language);
        				}
        			}
        			var tempObj = {};
        			angular.copy(gistObj, tempObj)
        			tempObj.filename = data.data[gist].files[file].filename;
        			tempObj.language = data.data[gist].files[file].language ? data.data[gist].files[file].language : 'NONE';
        			tempObj.size = data.data[gist].files[file].size;

        			$scope.allGist.push(tempObj);
        		};
        	};
        	$scope.ui.searchGist = false;
        	console.log($scope.allGist);
    	});
    };

    $scope.searchClicked = function(){
    	console.log($scope.ui.username);
    	getGistList($scope.ui.username)	
    };

    $scope.openGistDetails = function(gistObj){
    	$scope.ui.showList = false;
    	$scope.ui.showDetails = true;
    	$scope.gistDetails = gistObj
    	var count = window.localStorage.getItem('apiHitCount');
  		if(count){
  			window.localStorage.setItem('apiHitCount', parseInt(count) + 1);
  			$scope.ui.apiHits = parseInt(count) + 1;
  		}
  		else{
  			window.localStorage.setItem('apiHitCount', 1);
  			$scope.ui.apiHits = parseInt(count) + 1;
  		}
    	apiService.getGistDetails(gistObj.forks_url, null).then(function(data, status, headers){
        	$scope.gistForkDetails = data.data;
    	});

    };

    $scope.backToList = function(){
    	$scope.ui.showList = true;
    	$scope.ui.showDetails = false;
    };

    $scope.changeSort = function(sort, direction){
    	$scope.ui.sort = sort;
    	$scope.ui.sortDirection = direction;
    };

    $scope.selectTag = function(tag){
    	$scope.ui.currentTag = tag ? tag : '';
    };

  });
