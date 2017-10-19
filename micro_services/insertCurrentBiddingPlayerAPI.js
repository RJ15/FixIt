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
            var sqlInsertSeasons = "Call insertToSeasonTeamPlayers("+ connection.escape(event.seasonId) +", "+ connection.escape(event.playerId) +", "+ connection.escape(event.bidStatus) + ")";
            connection.query(sqlInsertSeasons, function(err, rows) {
                var result = "inserted into seasons teams players";
                response["body"] = result;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};
