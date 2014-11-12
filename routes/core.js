var express = require('express');
//var ensureLogin = require('connect-ensure-login');
//var ensureAuthenticated = ensureLogin.ensureAuthenticated;

exports.setup = function(app) {
    var router = express.Router();
    
//    router.all('*', ensureAuthenticated('/login'));

    return router;
};