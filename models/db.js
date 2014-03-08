var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

// bluemix
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongoblue = env['mongodb-2.2'][0]['credentials'];

} else {
    //local
    var mongolocal = {"hostname":'localhost', "port":27017, "username":"",
        "password":"", "name":"", "db":"teamateblog", "url":"mongodb://localhost:27017/teamateblog"}

}
module.exports ={
    blue: mongoblue,
    local: mongolocal
};




//module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {safe: true}));
//module.exports = new Db(settings.db, new Server('localhost', {safe: true});

// for IBM bluemix
//module.exports = new Db(settings.db, new Server(settings.host, 10322), {auto_reconnect: true}, {});