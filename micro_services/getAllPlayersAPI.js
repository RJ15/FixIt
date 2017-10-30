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
            var sqlQuery = "Call getAllPlayers()";
            connection.query(sqlQuery, function(err, rows) {
                console.log("aution:",rows)
                var players = {};
                players = rows[0];
                response["body"] = players;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};