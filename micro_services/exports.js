'use strict';

console.log('Loading function');


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'fixit.cvcj08bqo4xy.ap-south-1.rds.amazonaws.com',
    user     : 'root',
    password : 'FixitBuddy2017',
    database    : 'fixit'
});


exports.handler = (event, context, callback) => {
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
    }
    });
    var sqlQuery = "SELECT * FROM bid_type";
    var sqlQuery1 = "SELECT sea.id as seasonId, sea.name as seasonName, team.id as teamId, team.name as teamName, bid.description as bidType, player.id as playerId, player.name as playerName, feed.bid_value as price FROM auction_feed AS feed JOIN seasons AS sea ON feed.season_id = sea.id JOIN  teams AS team ON feed.team_id = team.id JOIN players AS player ON feed.player_id = player.id JOIN bid_type AS bid ON feed.bid_type = bid.id"
   connection.query(sqlQuery1, function(err, rows) {
    rows.forEach(function(item) {
      console.log(JSON.stringify(item));
    });
    response["body"] = rows;
     callback(null, response);
  });
  connection.end();
    
    //callback(null, response);
};
