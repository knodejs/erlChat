var app = angular.module('app', [
		'angular-loading-bar', 
		'ngAnimate','ui.bootstrap',
		'ui.router',
		'ng.sockjs.private',
		'ng.sockjs.public'
]);


app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/chat");
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


app.value('ngSockPublicRetry', 10000);
app.value('ngSockPrivateRetry', 10000);

app.value('ngSockPublicUrl', '/messages');
app.value('ngSockPrivateUrl', '/broadcast');