angular.module('badminton').controller('matchPageController', function ($scope, $rootScope, $state, $uibModal, $stateParams, $login,$timeout, usSpinnerService, $localStorage) {
    'use strict'


    $scope.games = $localStorage.games;
    $scope.isPlay = false;
    $scope.teamBpoints = 0;
    $scope.teamApoints = 0;
    $scope.isStart = false;
    $scope.activePlayer = null;
    $scope.undoDisable = false;
    $scope.teamAId = "playerA2";
    $scope.teamBId = "playerB1";
    $scope.serveTeam = "";
    $scope.receiveTeam = "";
    $scope.courtDisable = false;
    $scope.isScoreSelected = false;
    $scope.gameTrack = [{
        "teamApoints": 0,
        "teamBpoints": 0,
        "activePlayerId": "",
        "teamAplayer1": "",
        "teamAplayer2": "",
        "teamBplayer1": "",
        "teamBplayer2": ""

    }];

    $scope.setActivePlayer = function (id) {
        if (id == "playerA2") {
            if ($scope.teamApoints == 0 && $scope.teamBpoints == 0) {
                $scope.activePlayer = $scope.playerA2;
                $scope.serveTeam = "teamA";
                $scope.receiveTeam = "teamB";
                $scope.activePlayerId = "playerA2";

                $scope.setPlayers();
                $(".activePlayer").removeClass('activePlayer');
                $("#playerA2").addClass("activePlayer");
            }
        } else if (id == "playerB1") {
            if ($scope.teamApoints == 0 && $scope.teamBpoints == 0) {
                $scope.activePlayer = $scope.playerB1;
                $scope.activePlayerId = "playerB1";
                $scope.setPlayers();
                $(".activePlayer").removeClass('activePlayer');
                $("#playerB1").addClass("activePlayer");
                $scope.serveTeam = "teamB";
                $scope.receiveTeam = "teamA";
            }

        }



    }

    $scope.setPlayers = function () {
        $scope.gameTrack[0].teamAplayer1 = $scope.playerA1;
        $scope.gameTrack[0].teamAplayer2 = $scope.playerA2;
        $scope.gameTrack[0].teamBplayer1 = $scope.playerB1;
        $scope.gameTrack[0].teamBplayer2 = $scope.playerB2;
    }

    $scope.undo = function () {


        var len = $scope.gameTrack.length - 1;
        var activeId = "#" + $scope.gameTrack[len].activePlayerId;
        $scope.playerA1 = $scope.gameTrack[len].teamAplayer1;
        $scope.playerA2 = $scope.gameTrack[len].teamAplayer2;
        $scope.playerB1 = $scope.gameTrack[len].teamBplayer1;
        $scope.playerB2 = $scope.gameTrack[len].teamBplayer2;
        $scope.gameTrack.pop();
        len = $scope.gameTrack.length - 1;
        $scope.teamApoints = $scope.gameTrack[len].teamApoints;
        $scope.teamBpoints = $scope.gameTrack[len].teamBpoints;

        if (len == 0) {
            $scope.undoDisable = true;
            $scope.courtDisable = false;
        }
        $(".activePlayer").removeClass('activePlayer');
        $(activeId).addClass("activePlayer");
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

    $scope.swapAB = function () {
        var temp1 =  $scope.playerA1;
        $scope.playerA1 = $scope.playerB1;
        $scope.playerB1 = temp1;

        var temp2 =  $scope.playerA2;
        $scope.playerA2 = $scope.playerB2;
        $scope.playerB2 = temp2;
    }



    $scope.start = function () {
        $scope.isStart = true;

    }
    $scope.isSet = false;
    $scope.isCoordinateSelected = false;
    $scope.first = false;
    $scope.second = false;
    
    $scope.getCourtCoordinates = function () {
        
        
            $scope.isCoordinateSelected = true;
            

            $('.boxA').bind('click', function (ev) {

                ev.stopImmediatePropagation();
                if($scope.first == false){
                    $scope.first = true;
                }
                else{
                    $scope.second = true;
                }
                
                var offset = $('.court').offset();
                var x = ev.clientX - offset.left;
                var y = ev.clientY - offset.top;

                console.log(x, y);
                 $('#bubble').css('top',y+70);
                 $('#bubble').css('left',x+10);
                 $('.boxA').css('opacity','0.5');
                //  $('.boxA').each(function (){
                //     this.style.pointerEvents = 'none'; 
                //  }); 
                 
                 if($scope.second == true){
                    
                    $scope.restore();
                  
                 }
            });
            $('.boxB').bind('click',function (ev) {
                if($scope.first == false){
                    $scope.first = true;
                }
                else{
                    $scope.second = true;
                }
                
                var offset = $('.court').offset();
                var x = ev.clientX - offset.left;
                var y = ev.clientY - offset.top;

                console.log(x, y);
                 $('#bubble').css('top',y+70);
                 $('#bubble').css('left',x+10);
                 $('.boxB').css('opacity','0.5');
                //  $('.boxB').each(function (){
                //     this.style.pointerEvents = 'none'; 
                //  });
                 if($scope.second == true){
                    
                    
                    $scope.restore();
                    
                    
                 }
                 
            });
            
        
    }

    $scope.restore = function(){
        $timeout(function(){
            $('.court > div').css('background-color', 'white');
            $('.boxA').css('opacity','1');
            $('.boxB').css('opacity','1');
            $('.boxA').each(function (){
                this.style.pointerEvents = 'auto'; 
             });
             $('.boxB').each(function (){
                this.style.pointerEvents = 'auto'; 
             });
             $scope.isCoordinateSelected = false;
             $scope.isScoreSelected = false;
             $scope.first = false;
             $scope.isSet = false;
             $scope.second = false;
             var ele = $(".activePlayer");
             ele.addClass("activePlayer");
        },4000);

        
    }


    $scope.teamApointsUpdate = function () {
        console.log("updating");
        $scope.isScoreSelected = true;
        $('.court > div').css('background-color', 'yellow');
        $scope.getCourtCoordinates ();
        

        $scope.teamApoints = $scope.teamApoints + 1;
        $scope.activePlayerId = $(".activePlayer").attr('id');
        $scope.undoDisable = false;
        $scope.gameTrack.push({
            teamApoints: $scope.teamApoints,
            teamBpoints: $scope.teamBpoints,
            activePlayerId: $scope.activePlayerId,
            teamAplayer1: $scope.playerA1,
            teamAplayer2: $scope.playerA2,
            teamBplayer1: $scope.playerB1,
            teamBplayer2: $scope.playerB2,

        })
        if ($scope.teamApoints > 20) {
            alert("game won by Bulldozers");
            window.location.reload();
        }
        $scope.courtDisable = true;
        
        if ($scope.receiveTeam != "teamA") {
            $scope.swapA();
        }
        $scope.serveTeam = "teamA";
        $scope.receiveTeam = "teamB";

        // var ele = document.getElementsByClassName("activePlayer");
        var ele = $(".activePlayer");
        ele.removeClass("activePlayer");
        if (ele.attr('id') == "playerA2") {
            $("#playerA1").addClass("activePlayer");
        }
        else if (ele.attr('id') == "playerA1") {
            $("#playerA2").addClass("activePlayer");
        } else {
            if ($scope.teamApoints % 2 == 0) {
                $("#playerA2").addClass("activePlayer");
            } else {
                $("#playerA1").addClass("activePlayer");

            }
        }
        


    }
    $scope.teamBpointsUpdate = function () {
        $scope.isScoreSelected = true;
        $('.court > div').css('background-color', 'yellow');
        
        $scope.getCourtCoordinates ();
        $scope.teamBpoints = $scope.teamBpoints + 1;
        $scope.activePlayerId = $(".activePlayer").attr('id');
        $scope.undoDisable = false;
        $scope.gameTrack.push({
            teamApoints: $scope.teamApoints,
            teamBpoints: $scope.teamBpoints,
            activePlayerId: $scope.activePlayerId,
            teamAplayer1: $scope.playerA1,
            teamAplayer2: $scope.playerA2,
            teamBplayer1: $scope.playerB1,
            teamBplayer2: $scope.playerB2,

        })
        if ($scope.teamBpoints > 20) {

            alert("game won by smashDroppers");
            window.location.reload();
        }
        $scope.courtDisable = true;
        $('.court > div').css('cursor', 'not-allowed');
        if ($scope.receiveTeam != "teamB") {
            $scope.swapB();
        }
        $scope.serveTeam = "teamB";
        $scope.receiveTeam = "teamA";
        // var ele = document.getElementsByClassName("activePlayer");
        var ele = $(".activePlayer");
        ele.removeClass("activePlayer");
        if (ele.attr('id') == "playerB2") {
            $("#playerB1").addClass("activePlayer");
        }
        else if (ele.attr('id') == "playerB1") {
            $("#playerB2").addClass("activePlayer");
        } else {
            if ($scope.teamBpoints % 2 == 0) {
                $("#playerB1").addClass("activePlayer");
            } else {
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
