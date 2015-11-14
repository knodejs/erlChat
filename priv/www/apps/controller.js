app.controller('DashboardCtrl', ['$scope', function($scope) {

}]);

app.controller('ChatCtrl', ['$scope', function($scope) {

}]);

app.controller('ContactCtrl', ['$scope', function($scope) {

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
