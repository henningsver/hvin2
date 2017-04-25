 angular.module('WineApp')
  	.controller('VinlistaCtrl', function($scope, $http) {
    	$scope.isCollapsed = true;
      	$http.get("/api/viner").then(function (response) {
          	$scope.wines = response.data.records;
      	});
  	})
  	.controller('VinMatlistaCtrl', function($scope, $http) {
    	$scope.isCollapsed = true;
      	$http.get("api.php/listaVinMat").then(function (response) {
          	$scope.winefoods = response.data.records;
      	});
  	})
  	.controller('VinKallarelistaCtrl', function($scope, $http) {
    	$scope.isCollapsed = true;
      	$http.get("api.php/listaVinkallare").then(function (response) {
          	$scope.cellarwines = response.data.records;
      	});
  	});
