var express = require('express');

exports.setup = function(app) {
    var router = express.Router();
    
    router.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        next();
    });
    
    // Register the routes in order.
//    var core = require('./core');       // Registers ensureAuthenticated.
    var routes = require('./routes');   // Registers all other site routes.
    var error = require('./error');     // Registers error handlers.
    
    // Use the registered routes in order.
//    router.use(core.setup(app));
    router.use(routes.setup(app));
    router.use(error.setup(app));

    return router;
};