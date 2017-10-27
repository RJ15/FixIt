angular.module('badminton').controller('playersPageController', function ($scope, $rootScope, $state, $uibModal,$stateParams,usSpinnerService) {
    'use strict'
   

    $scope.players = [
        {
        "name": "Rajath",
        "rank": "1",
        "played": "10",
        "won": "8(80%)",
        "lost": "2",
        "rating": "35"
        },
        {
        "name": "Keshav",
        "rank": "1",
        "played": "10",
        "won": "8",
        "lost": "2",
        "rating": "35"
        },
         {
        "name": "Vani",
        "rank": "1",
        "played": "10",
        "won": "8",
        "lost": "2",
        "rating": "35"
        },
        {
        "name": "Manasa",
        "rank": "1",
        "played": "10",
        "won": "8",
        "lost": "2",
        "rating": "35"
        }
    ];

    $scope.smashDroppers = [
        {
            "name":"Keshav",
            "price":"35 lakhs"

        }
    ];
    
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
	
})
