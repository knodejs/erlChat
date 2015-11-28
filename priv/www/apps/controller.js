app.controller('DashboardCtrl', ['$scope', 'socketPublic', 'socketPrivate', function($scope, socketPublic, socketPrivate) {




    socketPrivate.onOpen(function() {
        console.log('socketPrivate  opened');
    });
    socketPrivate.onMessage(function(res) {
        console.log(res);
    });
    socketPrivate.onClose(function(res) {
        console.log('socketPrivate closed... will try to reconnect in 5 seconds');
    });


    socketPublic.onOpen(function() {
        console.log('socketPublic  opened');
    });
    socketPublic.onMessage(function(res) {
        console.log(res);
    });
    socketPublic.onClose(function(res) {
        console.log('socketPublic closed... will try to reconnect in 5 seconds');
    });


}]);

app.controller('ChatCtrl', ['$scope', 'socketPublic', 'socketPrivate', function($scope, socketPublic, socketPrivate) {
    $scope.data = {};
    $scope.messages = [];

    $scope.visible = true;
    $scope.expandOnNew = true;

    $scope.messages = [{
        'username': 'Matt',
        'content': 'Hi!'
    }, {
        'username': 'Elisa',
        'content': 'Whats up?'
    }, {
        'username': 'Matt',
        'content': 'I found this nice AngularJS Directive'
    }, {
        'username': 'Elisa',
        'content': 'Looks Great!'
    }];

    $scope.username = 'Matt';

    $scope.sendMessage = function(message, username) {
        if (message && message !== '' && username) {
            $scope.messages.push({
                'username': username,
                'content': message
            });
        }
    };

    $scope.sendData = function() {
        socketPublic.send($scope.data);
    };


    socketPublic.onOpen(function() {
        console.log('socketPublic  opened');
    });
    socketPublic.onMessage(function(res) {
        console.log(res);
        $scope.messages.unshift(res);
    });
    socketPublic.onClose(function(res) {
        console.log('socketPublic closed... will try to reconnect in 5 seconds');
    });

    socketPrivate.onOpen(function() {
        console.log('socketPrivate  opened');
    });
    socketPrivate.onMessage(function(res) {
        console.log(res);

    });
    socketPrivate.onClose(function(res) {
        console.log('socketPrivate closed... will try to reconnect in 5 seconds');
    });

}]);

app.controller('ContactCtrl', ['$scope', 'socketPublic', 'socketPrivate', function($scope, socketPublic, socketPrivate) {


    socketPublic.onOpen(function() {
        console.log('socketPublic  opened');
    });
    socketPublic.onMessage(function(res) {
        console.log(res);

    });
    socketPublic.onClose(function(res) {
        console.log('socketPublic closed... will try to reconnect in 5 seconds');
    });

    socketPrivate.onOpen(function() {
        console.log('socketPrivate  opened');
    });
    socketPrivate.onMessage(function(res) {
        console.log(res);
    });
    socketPrivate.onClose(function(res) {
        console.log('socketPrivate closed... will try to reconnect in 5 seconds');
    });


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
