angular.module('badminton').controller('fixturesPageController', function ($scope, $rootScope, $state, $uibModal,$stateParams,$login,usSpinnerService,$localStorage) {
    'use strict'
   
    $scope.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    }
    



    // code fixtures
    $scope.generated = false;
    $scope.teams = [
        {
            name: "Bulldozers",
            players: [
                "Rajath",
                "Supreet",
                "Kruthika",
                "Manasa",
                "Keerthan"
            ]
        },
        {
            name: "SmashDroppers",
            players: [
                "Anil",
                "Keshav",
                "Shivaraj",
                "Vani",
                "Ram"
            ]
        } 
    ];
    
    var teams = $scope.teams;
    $scope.teamsObj = [
        {
            name: "Bulldozers",
            players: [
                {
                    name: "Rajath",
                    status: true
                },
                {
                    name: "Supreet",
                    status: true
                },
                {
                    name: "Kruthika",
                    status: true
                },
                {
                    name: "Manasa",
                    status: true
                },
                {
                    name: "Keerthan",
                    status: true
                }]
        },
        {
            name: "SmashDroppers",
            players: [
                {
                    name: "Anil",
                    status: true
                },
                {
                    name: "Keshav",
                    status: true
                },
                {
                    name: "Shivaraj",
                    status: true
                },
                {
                    name: "Vani",
                    status: true
                },
                {
                    name: "Ram",
                    status: true
                }]
        } 
    ];
    $scope.filterTeam1= function(name, status){
        if(status){
            teams[0].players.push(name);
        }else {
            var index = teams[0].players.indexOf(name);
            teams[0].players.splice(index, 1);
        }

    }
    $scope.filterTeam2= function(name, status){
        if(status){
            teams[1].players.push(name);
        }else {
            var index = teams[1].players.indexOf(name);
            teams[1].players.splice(index, 1);
        }

    }
    $scope.generateAndRenderNewGame = function() {
        // initialzieTeams1();
        var numberofPlayersPerTeam = teams[0].players.length;
        var totalGames = getNumberOfGames(numberofPlayersPerTeam);
        var maxGamesPerPlayer = numberofPlayersPerTeam - 1;
        $scope.games = generate(totalGames, maxGamesPerPlayer);

        if ($scope.games.length > 0) {
            $scope.generated = true;
        }
        
       
    }
    $scope.finalize = function(){
        $localStorage.games = $scope.games;
        $state.go("matchPage")
    }
    var getRandomPlayer = function(team) {
        return team ? team.players[Math.floor(Math.random()*100)%team.players.length] : undefined;
    }
    
    var getCountOfGamesForPlayer = function(games, player) {
        var count = 0;
        for (var i = 0; i < games.length; i++) {
            if (games[i].teams[0].players[0] == player
            || games[i].teams[0].players[1] == player
            || games[i].teams[1].players[0] == player
            || games[i].teams[1].players[1] == player)
            count++;
        }
        return count;
    }
    
    var isTeam = function(team, player1, player2) {
        if ((team.players[0] == player1 && team.players[1] == player2)
        || (team.players[1] == player1 && team.players[0] == player2)) {
            return true;
        } else {
            return false;
        }
    }
    
    var havePlayedTogetherBefore = function(games, player1, player2) {
        for (var i = 0; i < games.length; i++) {
            if (isTeam(games[i].teams[0], player1, player2)
            || isTeam(games[i].teams[1], player1, player2))
            return true;
        }
        return false;
    }
    
    var didPlayLastTwoGames = function(games, player) {
        if (games.length <= 1) {
            return false;
        }
        if (games[games.length-1].teams[0].players[0] == player
        || games[games.length-1].teams[0].players[1] == player
        || games[games.length-1].teams[1].players[0] == player
        || games[games.length-1].teams[1].players[1] == player) {
            if (games[games.length-2].teams[0].players[0] == player
                || games[games.length-2].teams[0].players[1] == player
                || games[games.length-2].teams[1].players[0] == player
                || games[games.length-2].teams[1].players[1] == player) {
                    return true;
            } else {
                return false;
            }
        }
        return false;
    }
    
    var getAPlayingTeam = function(games, team, maxGamesPerPlayer) {
        var player1, player2, players;
        var loopCounter = 0;
    
        //validate player combination
        // 1. both players can't be same
        // 2. each player should not have already played max allowed games
        // 3. the players shouldn't have teamed up for an earlier game
        // 4. no player plays more than two continuous games
        while (getCountOfGamesForPlayer(games, player1) == maxGamesPerPlayer
            || getCountOfGamesForPlayer(games, player2) == maxGamesPerPlayer
            || player1 == player2
            || havePlayedTogetherBefore(games, player1, player2)
            || didPlayLastTwoGames(games, player1)
            || didPlayLastTwoGames(games, player2)) {
                if ((player1 == player2)
                    || havePlayedTogetherBefore(games, player1, player2)) {
                    player1 = getRandomPlayer(team);
                    player2 = getRandomPlayer(team);        
                }
                if (getCountOfGamesForPlayer(games, player1) == maxGamesPerPlayer
                    || didPlayLastTwoGames(games, player1)) {
                    player1 = getRandomPlayer(team);
                }
                if (getCountOfGamesForPlayer(games, player2) == maxGamesPerPlayer
                    || didPlayLastTwoGames(games, player2)) {
                    player2 = getRandomPlayer(team);
                }
            loopCounter++;
            if (loopCounter > 100) {
                throw new error("TooManyLoopsException");
            }
        }
        return players = [player1, player2];
    }
    
    function generate (totalGames, maxGamesPerPlayer) {
        var games = [];
        try {
            for (var i = 0; i < totalGames; i++) {
                games[i] = {
                    "matchNumber": i + 1,
                    "teams": [
                        {
                            "name": teams[0].name,
                            "players": getAPlayingTeam(games, teams[0], maxGamesPerPlayer)
                        },
                        {
                            "name": teams[1].name,
                            "players": getAPlayingTeam(games, teams[1], maxGamesPerPlayer)
                        }
                    ]
                }
            }
        } catch (error) {
            alert("Unable to generate, retry!");
            $scope.generated = false;
            games = [];
        }
        return games;
    }
    
   
    
    function getNumberOfGames(numberofPlayersPerTeam) {
        //nCr formula = n! / (r! * (n-r)!)
        var gameCount = factorial(numberofPlayersPerTeam) / (2 * factorial(numberofPlayersPerTeam - 2));
        return gameCount;
    }
    
    function factorial(number) {
        var factorial = number;
        for (var i = number - 1; i > 1; i--) {
            factorial *= i;
        }
    
        return factorial;
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
