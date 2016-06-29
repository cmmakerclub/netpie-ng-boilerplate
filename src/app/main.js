angular
    .module('app')
    .component('app', {
        templateUrl: 'app/main.html',
        controller: MainController
    });


/** @ngInject */
function MainController($scope, $localStorage) {
    var apply = function ($scope) {
        $scope.$apply()
        // _.defer(function () {
        // });
    };
    var microgear;
    var vm = this;
    $scope.is_connected = false;

    $scope.status = 'Waiting..';

    $scope.$storage = $localStorage.$default({
        appId: '',
        appKey: '',
        appSecret: '',
        chatWith: ''
    });

    $scope.doDisconnect = function () {
        microgear.disconnect();
        $scope.is_connected = false;
        $scope.status = 'Disconnected.';
    };

    $scope.doConnect = function () {
        microgear = Microgear.create({
            key: $scope.$storage.appKey,
            secret: $scope.$storage.appSecret,
            appId: $scope.$storage.appId
        });

        console.log(microgear);

        if (!microgear) {
            console.log("no microgear");
            return;
        }

        $scope.status = 'Connecting..';
        microgear.subscribe('/#');
        microgear.on('connected', function () {
            // this.status = "connected";
            console.log('Connected...');
            $scope.status = 'Connected..';
            microgear.setAlias($scope.alias || 'mygear');
            $scope.is_connected = true;
            apply($scope);
        });

        microgear.on('message', function (topic, body) {
            console.log('incoming : ' + topic + ' : ' + body);
            $scope.topic = topic;
            $scope.message = body;
            apply($scope);
        });

        microgear.on('closed', function () {
            $scope.is_connected = false;
            console.log('Closed...');
            apply($scope);
        });


        microgear.on('present', function (event) {
            console.log(event);
        });

        microgear.on('absent', function (event) {
            console.log(event);
        });


        microgear.connect($scope.$storage.appId)

    };
}
