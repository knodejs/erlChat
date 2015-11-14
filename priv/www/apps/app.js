var app = angular.module('app', ['angular-loading-bar', 'ngAnimate','ui.bootstrap','ui.router']);
app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("dashboard");
        $stateProvider
            .state("dashboard", {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller:'DashboardCtrl'
            })
            .state("chat", {
                url: '/chat',
                templateUrl: 'views/chat.html',
                controller:'ChatCtrl'
            })
             .state("contact", {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller:'ContactCtrl'
            })
    }
]);
