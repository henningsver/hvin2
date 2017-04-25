angular.module('WineApp', ['ngRoute', 'ui.bootstrap'])
	.config(function($routeProvider) {
    	$routeProvider
        .when("/", {
            templateUrl : "viner.html"
        })
        .when("/Viner", {
            templateUrl : "viner.html"
        })
        .when("/VinMat", {
            templateUrl : "vinmat.html"
        })
        .when("/VinKallare", {
            templateUrl : "vinkallare.html"
        })
        .otherwise({
            redirectTo: '/'
        });
	});
