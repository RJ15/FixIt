angular.module('badminton').controller('auctionPageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $http, $game) {
    'use strict'


    $scope.liveFeed = {};
    $scope.auctionFeed = {};
    $scope.seasons = {};
    $scope.teams = {};
    $scope.remainingPlayers = {};
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
