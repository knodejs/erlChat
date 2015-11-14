var app = angular.module('app', ['angular-loading-bar', 'ngAnimate','ui.bootstrap','ui.router']);
app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("app/dashboard");
        $stateProvider
            .state("dashboard", {
                url: '/dachboard',
                templateUrl: 'views/dashboard.html',
                controller:'DashboardCtrl'
            })
            .state("chat", {
                url: '/chat',
                templateUrl: 'views/chat.html',
                controller:'ChatCtrl'
            })
    }
]);
