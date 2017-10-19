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
            var sqlQuery = "Call getAuctionFeed()";
            connection.query(sqlQuery, function(err, rows) {
                var auctionFeed = {};
                auctionFeed.seasonId = rows[0][0].seasonId;
                auctionFeed.seasonName = rows[0][0].seasonName;
                rows[0].map(function(entry) {
                    delete entry.seasonId;
                    delete entry.seasonName;
                    return entry;
                })
                auctionFeed.auctionFeed = rows[0];
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