app.controller('DashboardCtrl', ['$scope','socketPublic','socketPrivate', function($scope,socketPublic,socketPrivate) {

}]);

app.controller('ChatCtrl', ['$scope','socketPublic','socketPrivate', function($scope,socketPublic,socketPrivate) {

}]);

app.controller('ContactCtrl', ['$scope','socketPublic','socketPrivate', function($scope,socketPublic,socketPrivate) {

}]);


app.directive('isActiveNav', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.location = $location;
            scope.$watch('location.path()', function(currentPath) {
                if ('/#' + currentPath === element[0].attributes['href'].nodeValue) {
                    element.parent().addClass('active');
                } else {
                    element.parent().removeClass('active');
                }
            });
        }
    };
}]);
