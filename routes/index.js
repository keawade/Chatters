var express = require('express');
exports.setup = function(app) {
    var router = express.Router();
    
    router.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        next();
    });
    
    // Register the routes in order.
    var core = require('./core');
    var error = require('./error');

    router.use(core.setup(app));
    router.use(error.setup(app));

    return router;
};