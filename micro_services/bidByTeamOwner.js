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
        "body": ""
    }
    
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        } else {
            console.log('MySQL Connection obtained');
            var sqlInsertQuery = "INSERT INTO auction_feed (season_id, team_id, player_id, bid_type, bid_value, timestamp) VALUES ("+ connection.escape(event.seasonId) +", "+ connection.escape(event.teamId) +", "+ connection.escape(event.playerId) +", "+ connection.escape(event.bidType) +", "+ connection.escape(event.bidValue) +", "+ connection.escape(event.timestamp) + ")";
            var sqlInsertSeasons = "INSERT INTO seasons_teams_players (season_id, team_id, player_id, price) VALUES ("+ connection.escape(event.seasonId) +", "+ connection.escape(event.teamId) +", "+ connection.escape(event.playerId) +", "+ connection.escape(event.bidValue) + ")";
            connection.query(sqlInsertQuery, function(err, rows) {
                var result = "inserted into auction feed";
                if (event.bidType == 'WINNING-BID') {
                    connection.query(sqlInsertSeasons, function(err, rows) {
                        response = "inserted into auction feed and seasons teams players";
                    })
                }
                response["body"] = result;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};
