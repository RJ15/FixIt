'use strict';

console.log('Loading function');

var mysql = require('mysql');

exports.handler = (event, context, callback) => {
    var connection = mysql.createConnection({
        host     : 'fixit.cvcj08bqo4xy.ap-south-1.rds.amazonaws.com',
        user     : 'root',
        password : 'FixitBuddy2017',
        database    : 'fixit'
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
            var sqlQuery = "SELECT sea.Id AS seasonId, sea.name AS seasonName, sea.overall_budget AS totalBudget, team.Id AS teamId, team.name AS teamName, (sea.overall_budget - SUM(seasons_teams_players.price)) as remainingBudget, player.id AS playerId, player.name AS name, seasons_teams_players.price AS price FROM seasons_teams_players JOIN seasons AS sea ON sea.id = seasons_teams_players.season_id JOIN teams AS team ON team.id = seasons_teams_players.team_id JOIN players AS player ON player.id = seasons_teams_players.player_id GROUP BY sea.Id, team.Id, player.id"
            var sqlQueryForRemainingPlayers = "SELECT  * FROM players as player WHERE player.id NOT IN (SELECT sea_team_player.player_id FROM seasons_teams_players as sea_team_player) and player.is_owner = 0"
            connection.query(sqlQuery, function(err, rows) {
                var totalBudget = 0;
                var seasonsTeamsPlayers = {};
                seasonsTeamsPlayers.seasonId = rows[0].seasonId;
                seasonsTeamsPlayers.seasonName = rows[0].seasonName;
                seasonsTeamsPlayers.totalBudget = rows[0].totalBudget;
                totalBudget = rows[0].totalBudget;
                rows.map(function(entry) {
                    delete entry.seasonId;
                    delete entry.seasonName;
                    delete entry.totalBudget;
                    return entry;
                })
                seasonsTeamsPlayers.teams = rows;

                var teamsArray = [];
                var obj = seasonsTeamsPlayers.teams.reduce(function(arr, team) {
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
                    seasonsTeamsPlayers.remainingPlayers = players;
                });
                response["body"] = seasonsTeamsPlayers;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};