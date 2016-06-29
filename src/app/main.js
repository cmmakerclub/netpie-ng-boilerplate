angular
    .module('app')
    .component('app', {
        templateUrl: 'app/main.html',
        controller: MainController
    });

/** @ngInject */
function MainController($scope, $localStorage) {
    // var vm = this;
    // $http
    //     .get('app/techs/techs.json')
    //     .then(function (response) {
    //         vm.techs = response.data;
    //     });
}
