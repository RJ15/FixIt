angular.module('badminton').controller('auctionPageController', function ($scope, $timeout, $rootScope, $state, $uibModal, $stateParams, $http, $game, usSpinnerService) {
    'use strict'


    $scope.liveFeed = {};
    $scope.auctionFeed = {};
    $scope.seasons = {};
    $scope.teams = {};
    $scope.remainingPlayers = {};
    $scope.progressValue1 = "100%";
    $scope.progressValue2 = "100%";
    $scope.bidPrice = 100000;
    $scope.slabValue = 100000;
    $scope.message = false;
    $scope.isBulldozerOwner = true;
    // $scope.counter = 30;
    // var stopped;

    //timeout function
    //1000 milliseconds = 1 second
    //Every second counts
    //Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.  
    // $scope.countdown = function () {

    //     stopped = $timeout(function () {

    //         $scope.counter--;

    //         $scope.countdown();
    //     }, 1000);
    // };


    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.refresh();
        if ($rootScope.userData != undefined){
            if ($rootScope.userData.isOwner && $rootScope.userData.playerId != "manasa-n") {
                $scope.isBulldozerOwner = false;
            }     
        }
    });





    $scope.bidBySmashDroppers = function () {
        // $scope.countdown();
        // $bidding.bidByBulldozers.then(function (response) {
        //     var payload = {
        //         "seasonId": $scope.seasons.seasonId,
        //         "teamId":$scope.teams[0],
        //         "playerId":"",
        //         "bidType":"",
        //         "bidValue": "",
        //         "timestamp":""

        //     }
            
    

        //     $scope.startSpin();
        //     if (response.statusCode) {
        //         $scope.refresh();
        //     }
        //     else {
        //         error("invalid response");
        //         $scope.stopSpin();
        //     }
        // }, function (error) {
        //     alert("error while posting bid");
        //     $scope.stopSpin();

        // })
        $scope.slabValue = $scope.getBidSlabValue($scope.bidPrice);
        $scope.bidPrice = $scope.bidPrice + $scope.slabValue;
        if ($scope.bidPrice != 10100000) {
            $scope.message = false;
        }
        if ($scope.bidPrice == 10100000) {
            $scope.message = true;
            $scope.bidPrice = 100000;
        }
    }
    $scope.bidByBulldozers = function () {
        // $scope.countdown();
        $scope.slabValue = $scope.getBidSlabValue($scope.bidPrice);
        $scope.bidPrice = $scope.bidPrice + $scope.slabValue;
        if ($scope.bidPrice != 10100000) {
            $scope.message = false;
        }
        if ($scope.bidPrice == 10100000) {
            $scope.message = true;
            $scope.bidPrice = 100000;
        }
        

    }
    $scope.getBidSlabValue = function (price) {
        if (price >= 10000000) {
            return 100000
        }
        if (price < 1000000) {
            return 100000;
        } else if (price >= 1000000 && price < 5000000) {
            return 500000;

        } else if (price >= 5000000) {
            return 1000000;
        }
    }
    $scope.refresh = function () {


        $game.getAuctionFeed().then(function (response) {
            $scope.startSpin();
            if (response.statusCode) {
                $scope.liveFeed = response.body;
                $scope.auctionFeed = $scope.liveFeed.auctionFeed;
                if ($scope.auctionFeed) {
                    for (var i = 0; i < $scope.auctionFeed.length; i++) {
                        var feed = $scope.auctionFeed[i];
                        if(feed.profilePic == null) {
                            feed.profilePic = "img/1.png"
                        } 
                        $scope.auctionFeed[i] = feed;
                    }
                    $scope.auctionFeed.reverse();
                }
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
                if ($scope.teams) {
                    for (var i = 0; i < $scope.teams.length; i++) {
                        var teams = $scope.teams[i];
                        for (var j = 0; j < teams.players.length; j++) {
                            var player = teams.players[j];
                            if(player.profilePic == null) {
                                player.profilePic = "img/1.png"
                            } 
                            teams.players[j] = player;
                        }
                        $scope.teams[i] = teams;
                    }
                }
                $scope.progressValue1 = ($scope.teams[0].remainingBudget / $scope.seasons.totalBudget) * 100;
                document.getElementsByClassName("team1")[0].style.width = $scope.progressValue1 + "%";
                $scope.progressValue2 = ($scope.teams[1].remainingBudget / $scope.seasons.totalBudget) * 100;
                document.getElementsByClassName("team2")[0].style.width = $scope.progressValue2 + "%";
                $scope.remainingPlayers = $scope.seasons.remainingPlayers;
                if ($scope.remainingPlayers) {
                    for (var i = 0; i < $scope.remainingPlayers.length; i++) {
                        var remainingPlayer = $scope.remainingPlayers[i];
                        if(remainingPlayer.profile_picture == null) {
                            remainingPlayer.profile_picture = "img/1.png"
                        } 
                        $scope.remainingPlayers[i] = remainingPlayer;
                    }
                }
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
