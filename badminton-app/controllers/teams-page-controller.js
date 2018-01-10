angular.module('badminton').controller('teamsPageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $login, usSpinnerService) {
    'use strict'

    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }
    $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("hamburger").style.display = "none";
    }
    $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("hamburger").style.display = "block";
    }
    $scope.gotoHome = function () {
        $state.go("homePage");
    }
    $scope.gotoPlayers = function () {
        $state.go("playersPage");
    }
    $scope.gotoAuction = function () {
        $state.go("auctionPage");
    }
    $scope.gotoFixtures = function () {
        $state.go("fixturesPage");
    }
    $scope.gotoTeams = function () {
        $state.go("teamsPage");
    }
    $scope.gotoMatch = function () {
        $state.go("matchPage")
    }
})
