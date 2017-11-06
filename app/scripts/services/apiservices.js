angular.module('gistListingApp')
  .service('apiService', function ($resource, $http, $httpParamSerializer, AppConfig) {
    
    function makeRequest(url, method, params, headers, data) {
        return $http({
            method: method,
            url: url,
            params: params,
            headers: headers,
            data: data
        });
    }


  this.getAllGist = function(url,data){
      return makeRequest(url, 'GET', data, null, null);
  };
  this.getGistDetails = function(url,data){
      return makeRequest(url, 'GET', data, null, null);
  };

});