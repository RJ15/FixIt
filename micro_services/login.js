'use strict';

console.log('Loading function');

var mysql      = require('mysql');

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
            var sqlQuery = "SELECT users.user_id as userId, player.id as playerId, player.is_owner as isOwner, player.is_auctioneer as isAuctioneer FROM user_credentials as users JOIN players as player on player.id = users.player_id where user_id = " + connection.escape(event.userName) + " and password = " + connection.escape(event.password);
            connection.query(sqlQuery, function(err, rows) {
                var loginResponse = {};
                loginResponse = rows;
                rows.forEach(function(item) {
                    loginResponse = item;
                })
                console.log(loginResponse);
                response["body"] = loginResponse;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};
