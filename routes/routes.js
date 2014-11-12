var express = require('express');
var io = require('socket.io');

exports.setup = function(app) {
    var router = express.Router();
    
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: "Streamers"
        });
    });
    
    router.get('/test', function(req, res, next) {
        res.render('test', {
            title: "Never gonna give you up.",
        });
    });

    return router;
};