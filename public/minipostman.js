 /*global angular*/
angular.module("App",["ngRoute"]).config( function ($routeProvider){
    $routeProvider
    .when("/ui/v1/population-stats", {
        controller : "ListCtrl",
        templateUrl: "/population-stats/list.html"
    })
    .when("/ui/v1/population-stats/edit/:country/:year", {
        controller : "EditCtrl",
        templateUrl: "/population-stats/edit.html"
    })
    .when("/", {
        templateUrl: "principal.html"
    })
    
    
    .when("/integrations", {
        templateUrl: "/integrations/integrations.html"
    })
    
    
    //Integraciones
    
    .when("/integrations/population-stats", {
        controller : "APICtrl",
        templateUrl : "/integrations/views/myAPI.html"
    })
    .when("/integrations/public-general-expenses", {
        controller : "ExpensesCtrl",
        templateUrl : "/integrations/views/G11-expenses.html"
    })
    .when("/integrations/life-expectancy-stats", {
        controller : "LifeCtrl",
        templateUrl : "/integrations/views/G12-life.html"
    })
    .when("/integrations/weather", {
        controller : "WeatherCtrl",
        templateUrl : "/integrations/views/weather-extern.html"
    })
    .when("/integrations/bikes", {
        controller : "BikesCtrl",
        templateUrl : "/integrations/views/bikes-extern.html"
    })
    
    //Vídeo
    .when("/about", {
        templateUrl: "/integrations/views/about.html"
    });

    
    
});
console.log("MiniPostmanApp initialized!");