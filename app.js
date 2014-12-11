var debug = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[DEBUG " + (new Date).toLocaleTimeString() + "]";
    };

    return {
        log: console.log.bind(console, '%s', timestamp)
    };
})();

// Required apps.
var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var bodyParser = require('body-parser');
var routes = require('./routes/');
//var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoSession = require('connect-mongo')(session);
//var LocalStrategy = require('passport-local').Strategy;
//var ensureLogin = require('connect-ensure-login');
//var ensureAuthenticated = ensureLogin.ensureAuthenticated;
var user = require('./Models/user');

var http = require('http');

// Connect to our mongodb server
var db = mongoose.connect('mongodb://'+ (process.env.IP || 'localhost') + '/users');

// Create new express app.
var app = express();
var server = http.createServer(app);

var sessionStore = new mongoSession({
        db : 'users',
        host : process.env.IP
    });

// cookieParser() and session() need to be initialized before passport.
app.use(cookieParser('old string'));
app.use(session({
    secret: 'old string',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

app.set('sessionStore', sessionStore);

// Configure passport.
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Initialize passport.
app.use(passport.initialize());
app.use(passport.session());

// Register partial hbs files
hbsutils.registerPartials('./views/partials');
//hbsutils.registerWatchedPartials('./views/partials');

// Set Handlebars running and as the engine for html
app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

// Set the port and ip address
app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.IP || '0.0.0.0');

// Set root directory.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

// Bring in the routes
app.use(routes.setup(app, server));

// Run the server
server.listen(app.get('port'), app.get('ip'), function() {
    var addr = server.address();
    debug.log("Streamers app running on https://" + addr.address + ":" + addr.port);
});
