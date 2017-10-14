angular.module('badminton').controller('auctionPageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $http, $game,usSpinnerService) {
    'use strict'


    $scope.liveFeed = {};
    $scope.auctionFeed = {};
    $scope.seasons = {};
    $scope.teams = {};
    $scope.remainingPlayers = {};
    $scope.progressValue1 = "100%";
    $scope.progressValue2 = "100%";

    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }
    $scope.$on('$viewContentLoaded', function()
    {
        $scope.refresh();
    });
    $scope.refresh = function () {

        $game.getAuctionFeed().then(function (response) {
            $scope.startSpin();
            if (response.statusCode) {
                $scope.liveFeed = response.body;
                $scope.auctionFeed = $scope.liveFeed.auctionFeed;
                $scope.auctionFeed.reverse();
                $scope.stopSpin();
            }
            else {
                error("invalid response");
                $scope.stopSpin();
            }
        }, function (error) {
            alert("error while getting auction feed");
            $scope.stopSpin();

        })

        $game.getSeasonsTeamsPlayers().then(function (response) {
            $scope.startSpin();
            if (response.statusCode) {

                $scope.seasons = response.body;
                $scope.teams = $scope.seasons.teams;
                
                $scope.progressValue1 = ($scope.teams[0].remainingBudget / $scope.seasons.totalBudget) * 100;
                document.getElementsByClassName("team1")[0].style.width = $scope.progressValue1 + "%";
                $scope.progressValue2 = ($scope.teams[1].remainingBudget / $scope.seasons.totalBudget) * 100;
                document.getElementsByClassName("team2")[0].style.width = $scope.progressValue2+ "%";
                $scope.remainingPlayers = $scope.seasons.remainingPlayers;
               $scope.stopSpin();
                
            }
            else {
                error("invalid response");
                  $scope.stopSpin();
                
            }
        }, function (error) {
            alert("error while getting seasons teams players");
            $scope.stopSpin();

        })

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

})
