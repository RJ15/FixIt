angular.module('badminton').controller('homePageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, usSpinnerService) {
    'use strict'


    $scope.bulldozer = [
        {
            "name": "Rajath",
            "price": "35 Lakhs"
        },
        {
            "name": "Ram",
            "price": "35 Lakhs"
        },
        {
            "name": "Kuki",
            "price": "35 Lakhs"
        }
    ];

    $scope.smashDroppers = [
        {
            "name": "Keshav",
            "price": "35 lakhs"

        }
    ];

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
    $scope.openNav = function () {
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("hamburger").style.display = "none";
    }
    $scope.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("hamburger").style.display = "block";
    }

})
