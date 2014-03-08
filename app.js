
/**
 * Module dependencies.
 */

var express = require('express');
var router = require('./routes/router');
var http = require('http');
var path = require('path');
var settings = require('./settings');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        //db: settings.db
        url: 'mongodb://7a07ef7c-9678-481a-85bc-b51c4439555a:d7287302-fc7e-45c3-9947-0d2639c916f0@10.0.116.152:10188/db/sessions'
    })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

router(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
