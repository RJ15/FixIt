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
            event.matchScores.forEach(function(score) {
                console.log(score);
                var sqlUpdateMatchScore = "Call updateMatchScore("+ score.matchId +", "+ score.scoreId +", "+ score.teamAScore +", "+ score.teamBScore +", "+ score.serviceBy +", "+ score.serviceReceiver +", "+ score.scoreType +", "+ score.scoreAttribution +", "+ score.shotFromPositionX +", "+ score.shotFromPositionY +", "+ score.shotEndPositionX +", "+ score.shotEndPositionY +", "+ score.scoreTime +")";
                connection.query(sqlUpdateMatchScore, function(err, rows) {
                    var result = "Inserted into match score"
                    response["body"] = result;
                });
            });

        }
    });
};