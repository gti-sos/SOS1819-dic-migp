/* global angular */

angular
    .module("App")
    .controller("EditCtrl", ["$scope","$http", "$routeParams", "$location",
    
    function ($scope, $http, $routeParams, $location) {
        console.log("EditCtrl initialized");
        var API = "/api/v1/population-stats";
        
        var country = $routeParams.country;
        var year = $routeParams.year;
        
        console.log("Requesting rate <"+API+"/"+country+"/"+year+">...");
        
        $http.get(API+"/"+country+"/"+year).then(function(response) {
            console.log("Data Received: " + JSON.stringify(response.data, null, 2));
            $scope.populationStat = response.data;
        });
        
        $scope.updaterate = function(country, year) {
            console.log("Updating rate with country "+country+" and year "+year);
            $http
                .put(API+"/"+country+"/"+year, $scope.populationStat)
                .then(function(response) {
                    console.log("PUT response: "+ response.status + " " + response.data);
                    alert("El recurso ha sido actualizado con exito");
                    $location.path("/ui/v1/population-stats");
                }, function(error) {
                    alert("Introduce correctamente los datos");
                });
            
        };
    }])