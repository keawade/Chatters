var debug = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[DEBUG " + (new Date).toLocaleTimeString() + "]";    
    };

    return {
        log: console.log.bind(console, '%s', timestamp)
    };
})();

var express = require('express');

exports.setup = function(app) {
    var router = express.Router();
    
    // 404 Page Not Found handler
    router.use(function(req, res) {
        debug.log('404 Not Found: ' + req.originalUrl);
        res.status(404).render('error', {
            notification: {
                severity: "error",
                title: "404 - Page Not Found",
                message: "Sorry! The page you requested doesn’t exist."
            }
        });
    });
    
    // 400 Not Found handler
    router.use(function(req, res) {
        debug.log('400 Bad Request: ' + req.originalUrl);
        res.status(400).render('error', {
            notification: {
                severity: "error",
                title: "400 - Server Error",
                message: "Whoops! We didn't know how to process that request!"
            }
        });
    });

    return router;
};