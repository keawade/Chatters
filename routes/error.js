var express = require('express');

exports.setup = function(app) {
    var router = express.Router();
    
    // 404 Page Not Found handler
    router.use(function(req, res) {
        console.warn('404 Not Found: %s', req.originalUrl);
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
        console.warn('400 Not Found: %s', req.originalUrl);
        res.status(400).render('error', {
            notification: {
                severity: "error",
                title: "400 - Server Error",
                message: "Whoops! We dropped something on our end and the page broke!"
            }
        });
    });

    return router;
};