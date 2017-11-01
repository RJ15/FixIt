angular.module('badminton').controller('matchPageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $login, usSpinnerService, $localStorage) {
    'use strict'


    $scope.games = $localStorage.games;
    $scope.isPlay = false;
    $scope.teamBpoints = 0;
    $scope.teamApoints = 0;
    $scope.isStart = false;
    $scope.activePlayer = null;
    $scope.teamAId = "playerA2";
    $scope.teamBId = "playerB1";
    $scope.serveTeam = "";
    $scope.receiveTeam = "";
    $scope.courtDisable = false; 
    $scope.setActivePlayer = function(id){
        if(id == "playerA2"){
            if ($scope.teamApoints==0 && $scope.teamBpoints==0) {
                $scope.activePlayer = $scope.playerA2;
                $scope.serveTeam = "teamA";
                $scope.receiveTeam = "teamB";
                $("#playerA2").addClass("activePlayer");
            }
        }else if(id == "playerB1"){
            if ($scope.teamApoints==0 && $scope.teamBpoints==0) {
                $scope.activePlayer = $scope.playerB1;
                $("#playerB1").addClass("activePlayer");
                $scope.serveTeam = "teamB";
                $scope.receiveTeam = "teamA";
            }

        }
            
            

    }
    


        
    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }



    $scope.getClass = function (index) {
        if ((index + 1) % 2 == 0) {
            return "even-card";
        } else {
            return "odd-card";
        }
    }



    $scope.play = function (number) {

        $scope.isPlay = true;
        $scope.gamesDetails = {};
        $scope.gamesDetails = $scope.games[number - 1];
        console.log($scope.gamesDetails);
        $scope.playerA1 = $scope.gamesDetails.teams[0].players[0];
        $scope.playerA2 = $scope.gamesDetails.teams[0].players[1];

        $scope.playerB1 = $scope.gamesDetails.teams[1].players[0];
        $scope.playerB2 = $scope.gamesDetails.teams[1].players[1];
    }

    $scope.swapA = function () {
        var temp = $scope.playerA1;
        $scope.playerA1 = $scope.playerA2;
        $scope.playerA2 = temp;

    }
    $scope.swapB = function () {
        var temp = $scope.playerB1;
        $scope.playerB1 = $scope.playerB2;
        $scope.playerB2 = temp;
    }



    $scope.start = function () {
        $scope.isStart = true;

    }

    $scope.teamApointsUpdate = function () {
        
        $scope.teamApoints = $scope.teamApoints + 1;
        if($scope.teamApoints > 20 ){
            alert("game won by Bulldozers");
            window.location.reload();
        }
        $scope.courtDisable = true; 
        $('.court > div').css('cursor','not-allowed');
        if($scope.receiveTeam != "teamA"){
            $scope.swapA();
        }
        $scope.serveTeam = "teamA";
        $scope.receiveTeam = "teamB";
        
        // var ele = document.getElementsByClassName("activePlayer");
        var ele =$(".activePlayer");
        ele.removeClass("activePlayer");
        if(ele.attr('id') == "playerA2"){
             $("#playerA1").addClass("activePlayer");
        }
        else if(ele.attr('id') == "playerA1"){
            $("#playerA2").addClass("activePlayer");
        }else {
            if($scope.teamApoints % 2 == 0){   
                $("#playerA2").addClass("activePlayer");
            }else{
                $("#playerA1").addClass("activePlayer");

            }
        }
        
        
    }
    $scope.teamBpointsUpdate = function () {
        
        $scope.teamBpoints = $scope.teamBpoints + 1;
        if($scope.teamBpoints > 20 ){
            
            alert("game won by smashDroppers");
            window.location.reload();
        }
        $scope.courtDisable = true; 
        $('.court > div').css('cursor','not-allowed');
        if($scope.receiveTeam != "teamB"){
            $scope.swapB();
        }
        $scope.serveTeam = "teamB";
        $scope.receiveTeam = "teamA";
        // var ele = document.getElementsByClassName("activePlayer");
        var ele =$(".activePlayer");
        ele.removeClass("activePlayer");
        if(ele.attr('id') == "playerB2"){
            $("#playerB1").addClass("activePlayer");
        }
        else if(ele.attr('id') == "playerB1"){
            $("#playerB2").addClass("activePlayer");
        }else {
            if($scope.teamBpoints % 2 == 0){   
                $("#playerB1").addClass("activePlayer");
            }else{
                $("#playerB2").addClass("activePlayer");

            }
        }
        
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

})
