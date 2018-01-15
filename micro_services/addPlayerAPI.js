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
            var sqlAddPlayer = "Call addPlayer("+ connection.escape(event.playerId) +", "+ connection.escape(event.playerName);
            connection.query(sqlAddPlayer, function(err, rows) {
                var result = "inserted into players";
                response["body"] = result;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};