var connect = require('connect')
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8070,function(){
    console.log('server running on 8070');
})