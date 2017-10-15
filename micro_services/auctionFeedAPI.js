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
            var sqlQuery = "SELECT sea.id as seasonId, sea.name as seasonName, feed.id as auctionFeedId, team.id as teamId, team.name as teamName, bid.description as bidType, player.id as playerId, player.name as playerName, player.profile_picture as profilePic, feed.bid_value as price, feed.timestamp as timestamp  FROM auction_feed AS feed JOIN seasons AS sea ON feed.season_id = sea.id JOIN  teams AS team ON feed.team_id = team.id JOIN players AS player ON feed.player_id = player.id JOIN bid_type AS bid ON feed.bid_type = bid.id GROUP BY feed.id"
            connection.query(sqlQuery, function(err, rows) {
                var auctionFeed = {};
                auctionFeed.seasonId = rows[0].seasonId;
                auctionFeed.seasonName = rows[0].seasonName;
                rows.map(function(entry) {
                    delete entry.seasonId;
                    delete entry.seasonName;
                    return entry;
                })
                auctionFeed.auctionFeed = rows;
                rows.forEach(function(item) {
                  console.log(JSON.stringify(item));
                });
                response["body"] = auctionFeed;
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};