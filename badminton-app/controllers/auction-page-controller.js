angular.module('badminton').controller('auctionPageController', function ($scope, $timeout, $rootScope, $state, $uibModal, $stateParams, $http, $game, usSpinnerService,$bidding) {
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
    $scope.bidBy = "";
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
    $scope.getColor = function (budgetLeft) {
        if (budgetLeft <= 25 || budgetLeft <= 25) {
            return "redColor";
        } 
        if (budgetLeft > 25 && budgetLeft <= 50) {
            return "orangeColor";
        }
        if (budgetLeft > 50 && budgetLeft <= 75) {
            return "cyanColor";
        }  
        if (budgetLeft > 75 && budgetLeft <= 100) {
            return "greenColor";
        }
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.getSeasons();
        
    });





    $scope.bidBySmashDroppers = function () {
        
        $scope.slabValue = $scope.getBidSlabValue($scope.bidPrice);
        $scope.bidPrice = $scope.bidPrice + $scope.slabValue;
        if ($scope.bidPrice != 10100000) {
            $scope.message = false;
        }
        if ($scope.bidPrice == 10100000) {
            $scope.message = true;
            $scope.bidPrice = 100000;
        }
        $scope.bidBy =  $scope.teams[1].teamId;
        // $scope.countdown();
        var payload = {
                "seasonId": $scope.seasons.seasonId,
                "teamId":$scope.teams[1].teamId,
                "playerId": $scope.remainingPlayers[0].id,
                "bidType": "BID",
                "bidValue": $scope.bidPrice

            }
        $bidding.bidByTeam(payload).then(function (response) {
            
            $scope.startSpin();
            if (response.statusCode) {
                $scope.stopSpin();
                $scope.refresh();
            }
            else {
                error("invalid bid");
                $scope.stopSpin();
            }
        }, function (error) {
            alert("error while bidding");
            $scope.stopSpin();

        })

    }
    $scope.wonBid = function (){
        var payload = {
                "seasonId": $scope.seasons.seasonId,
                "teamId":$scope.bidBy,
                "playerId": $scope.remainingPlayers[0].id,
                "bidType": "WINNING-BID",
                "bidValue": $scope.bidPrice

        }
        $bidding.wonByTeam(payload).then(function (response) {
            
            $scope.startSpin();
            if (response) {
                alert("bid won");
                $scope.stopSpin();
                $scope.refresh();
                $scope.getSeasons();
                $scope.bidPrice = 100000;
                $scope.slabValue = 100000;

            }

            else {
                error("invalid bid");
                $scope.stopSpin();
            }
        }, function (error) {
            alert("error while winning bid");
            $scope.stopSpin();

        })


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
        
        $scope.bidBy =  $scope.teams[0].teamId;
        var payload = {
                "seasonId": $scope.seasons.seasonId,
                "teamId":$scope.teams[0].teamId,
                "playerId": $scope.remainingPlayers[0].id,
                "bidType": "BID",
                "bidValue": $scope.bidPrice

        }
        $bidding.bidByTeam(payload).then(function (response) {
            
            $scope.startSpin();
            if (response.statusCode) {
                $scope.refresh();
                $scope.stopSpin();
            }
            else {
                error("invalid bid");
                $scope.stopSpin();
            }
        }, function (error) {
            alert("error while bidding");
            $scope.stopSpin();

        })


    }
    $scope.getBidSlabValue = function (price) {
        if (price >= 10000000) {
            return 100000
        }
        if (price < 1000000) {
            return 100000;
        } else if (price >= 1000000 && price < 5000000) {
            return 200000;

        } else if (price >= 5000000) {
            return 500000;
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
                            feed.profilePic = "img/1.png";
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

        

    }
    
    $scope.getSeasons = function(){
        // $scope.getColor();
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
                                player.profilePic = "img/1.png";
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
                            remainingPlayer.profile_picture = "img/1.png";
                        } 
                        if(remainingPlayer.played == null && remainingPlayer.won == null && remainingPlayer.lost == null)  {
                            remainingPlayer.played = "-";
                            remainingPlayer.won = "-";
                            remainingPlayer.lost = "-";
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
