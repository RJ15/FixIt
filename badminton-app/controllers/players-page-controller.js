angular.module('badminton').controller('playersPageController', function ($scope, $timeout, $rootScope, $state, $uibModal, $stateParams, $http, $game, usSpinnerService,$bidding) {
    'use strict'
   
       
    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }

    // $scope.players = [
    //     {
    //     "name": "Rajath",
    //     "rank": "1",
    //     "played": "10",
    //     "won": "8(80%)",
    //     "lost": "2",
    //     "rating": "35"
    //     },
    //     {
    //     "name": "Keshav",
    //     "rank": "1",
    //     "played": "10",
    //     "won": "8",
    //     "lost": "2",
    //     "rating": "35"
    //     },
    //      {
    //     "name": "Vani",
    //     "rank": "1",
    //     "played": "10",
    //     "won": "8",
    //     "lost": "2",
    //     "rating": "35"
    //     },
    //     {
    //     "name": "Manasa",
    //     "rank": "1",
    //     "played": "10",
    //     "won": "8",
    //     "lost": "2",
    //     "rating": "35"
    //     }
    // ];

    $scope.smashDroppers = [
        {
            "name":"Keshav",
            "price":"35 lakhs"

        }
    ];

    $scope.$on('$viewContentLoaded', function () {
        $scope.getAllSeasonPlayers();
        
    });
    
    $scope.getAllSeasonPlayers = function() {
        $game.getAllPlayers().then(function (response) {
            $scope.startSpin();
            if (response.statusCode) {
                $scope.players = response.body;
                $scope.stopSpin();
            }
        });
    }
    $scope.openNav = function(){
        document.getElementById("mySidenav").style.width = "100%";
    }
    $scope.closeNav = function(){
        document.getElementById("mySidenav").style.width = "0";
    }
    
    $scope.gotoHome = function(){
        $state.go("homePage");
    }
    $scope.gotoPlayers = function(){
        $state.go("playersPage");
    }
    $scope.gotoAuction = function(){
        $state.go("auctionPage");
    }
    $scope.gotoFixtures = function(){
        $state.go("fixturesPage");
    }
    $scope.gotoTeams = function(){
        $state.go("teamsPage");
    }
    $scope.gotoMatch = function(){
        $state.go("matchPage")
    }
	
})
    