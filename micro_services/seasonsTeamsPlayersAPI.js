'use strict';

console.log('Loading function');

var mysql = require('mysql');

exports.handler = (event, context, callback) => {
    var connection = mysql.createConnection({
        host     : '',
        user     : '',
        password : '',
        database : ''
    });
    
    var response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {},
        "body": {}
    }
    
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        } else {
            console.log('MySQL Connection obtained');
            var sqlQuery = "Call getSeasonsTeamsPlayers()";
            var sqlQueryForRemainingPlayers = "Call getRemainingPlayers()";
            connection.query(sqlQuery, function(err, rows) {
                var totalBudget = 0;
                var seasonsTeamsPlayers = {};
                seasonsTeamsPlayers.seasonId = rows[0][0].seasonId;
                seasonsTeamsPlayers.seasonName = rows[0][0].seasonName;
                seasonsTeamsPlayers.totalBudget = rows[0][0].totalBudget;
                totalBudget = rows[0][0].totalBudget;
                rows.map(function(entry) {
                    delete entry.seasonId;
                    delete entry.seasonName;
                    delete entry.totalBudget;
                    return entry;
                })
                seasonsTeamsPlayers.teams = rows;

                var teamsArray = [];
                var obj = seasonsTeamsPlayers.teams[0].reduce(function(arr, team) {
                    var teamObj = teamsArray[team.teamId];
                    if (!teamObj){
                        teamObj = {};
                        teamObj.teamId = team.teamId;
                        teamObj.teamName = team.teamName;
                        teamObj.remainingBudget = totalBudget;
                        teamObj.players = [];
                        teamsArray[team.teamId] = teamObj;
                    }
                    var teamPlayer = {};
                    teamPlayer.playerId = team.playerId;
                    teamPlayer.name = team.name;
                    teamPlayer.price = team.price;
                    teamPlayer.profilePic = team.profilePic;
                    
                    teamsArray[team.teamId].remainingBudget = teamObj.remainingBudget - team.price;
                    teamsArray[team.teamId].players.push(teamPlayer);
                    return teamsArray;
                }, {});

                var teams = [];
                var teamIds = Object.keys(obj);
                teamIds.forEach(function (element) {
                    teams.push(obj[element]);
                });
                seasonsTeamsPlayers.teams = teams;

                connection.query(sqlQueryForRemainingPlayers, function(err, players) {
                    seasonsTeamsPlayers.remainingPlayers = players[0];
                });
                response["body"] = seasonsTeamsPlayers;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};