angular.module('badminton').controller('loginController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $login, usSpinnerService) {
    'use strict'

    $scope.username = "";
    $scope.password = "";
    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }
    $scope.login = function () {
        //test login
        // if($scope.username == "keer" && $scope.password == "1234"){
        //     alert("Success");
        //     $state.go("auctionPage");
        // }
        // else{
        //     alert("failure");
        // }
        var data = {
            userName: $scope.username,
            password: $scope.password
        }
        $login.doLogin(data).then(function (response) {
            $scope.startSpin();
            if (response.statusCode && response.body) {
                $state.go("auctionPage");
                $rootScope.userData = response.body;
                console.log(userData);
                $scope.stopSpin();
            }
            else {
                error("invalid username or password");
                $scope.stopSpin();
            }
        }, function (error) {
            alert("error while loggin in");
            $scope.stopSpin();

        })
    }
})
