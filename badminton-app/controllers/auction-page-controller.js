angular.module('badminton').controller('auctionPageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $http, $game) {
    'use strict'


    $scope.liveFeed = {};
    $scope.auctionFeed = {};
    $scope.seasons = {};
    $scope.teams = {};
    $scope.remainingPlayers = {};
    $scope.progressValue1 = "100%";
    $scope.progressValue1 = "100%";
    $scope.refresh = function () {

        $game.getAuctionFeed().then(function (response) {
            if (response.statusCode) {
                $scope.liveFeed = response.body;
                $scope.auctionFeed = $scope.liveFeed.auctionFeed;
                $scope.auctionFeed.reverse();
            }
            else {
                error("invalid response");
            }
        }, function (error) {
            alert("error while getting auction feed");

        })

        $game.getSeasonsTeamsPlayers().then(function (response) {
            if (response.statusCode) {
                $scope.seasons = response.body;
                $scope.teams = $scope.seasons.teams;
                
                $scope.progressValue1 = ($scope.teams[0].remainingBudget / $scope.seasons.totalBudget) * 100;
                document.getElementsByClassName("team1")[0].style.width = $scope.progressValue1 + "%";
                $scope.progressValue2 = ($scope.teams[1].remainingBudget / $scope.seasons.totalBudget) * 100;
                document.getElementsByClassName("team2")[0].style.width = $scope.progressValue2+ "%";
                $scope.remainingPlayers = $scope.seasons.remainingPlayers;
            }
            else {
                error("invalid response");
            }
        }, function (error) {
            alert("error while getting seasons teams players");

        })

    }


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

})
