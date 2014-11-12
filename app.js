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

var http = require('http').Server(app);
var io = require('socket.io')(http);


// Create new express app.
var app = express();

// Register partial hbs files
hbsutils.registerPartials('./views/partials');
hbsutils.registerWatchedPartials('./views/partials');

// Set Handlebars running and as the engine for html
app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

// Set the port and ip address
app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.IP || '0.0.0.0');

// Set root directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

// Bring in the routes
app.use(routes.setup(app));

// Run the server
var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    debug.log("Streamers app running on https://" + address.address + ":" + address.port);
});