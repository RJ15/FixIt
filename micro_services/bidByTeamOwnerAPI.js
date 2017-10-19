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
        "body": ""
    }
    
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        } else { 
            console.log('MySQL Connection obtained');
            var sqlInsertQuery = "Call insertToAuctionFeed("+ connection.escape(event.seasonId) +", "+ connection.escape(event.teamId) +", "+ connection.escape(event.playerId) +", "+ connection.escape(event.bidType) +", "+ connection.escape(event.bidValue) +")";
            var sqlInsertSeasons = "Call updateToSeasonTeamPlayers("+ connection.escape(event.seasonId) +", "+ connection.escape(event.teamId) +", "+ connection.escape(event.playerId) +", "+ connection.escape(event.bidValue) + ")";
            connection.query(sqlInsertQuery, function(err, rows) {
                var result = "inserted into auction feed";
                if (event.bidType == 'WINNING-BID') {
                    connection.query(sqlInsertSeasons, function(err, rows) {
                        result = "inserted into auction feed and seasons teams players";
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
