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
            var sqlPlayerTransfer = "Call playerTransfer("+ connection.escape(event.seasonId) +", "+ connection.escape(event.teamId) +", "+ connection.escape(event.playerId);
            connection.query(sqlPlayerTransfer, function(err, rows) {
                var result = "updated player Transfer";
                response["body"] = result;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};