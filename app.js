// Required apps.
var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var bodyParser = require('body-parser');
var routes = require('./routes/');

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

// Bring in the routes
app.use(routes.setup(app));

// Run the server
var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log("Streamers app running on https://%s:%s",
        address.address, address.port);
});