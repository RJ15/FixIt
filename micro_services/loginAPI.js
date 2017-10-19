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
            var sqlQuery = "Call doLogin(" + connection.escape(event.userName)+", "+connection.escape(event.password) + ")";
            connection.query(sqlQuery, function(err, rows) {
                var loginResponse = {};
                loginResponse = rows[0];
                rows.forEach(function(item) {
                    loginResponse = item;
                })
                console.log(loginResponse);
                response["body"] = rows[0][0];
                connection.end(function(err) {
                   callback(null, response); 
                });
            });
        }
    });
};
