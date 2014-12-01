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
var io = require('socket.io');
var user = require('../Models/User');
var passport = require('passport');

exports.setup = function(app) {
    var router = express.Router();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    
    
    app.use(function(req, res, next) {
        var user = req.user;
        if (user) {
            res.locals.user = {
                username: user.username,
                id: user._id
            };
        }
        next();
    });
    
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: "Home | Streamers",
            user: res.locals.user
        });
    });
    
    router.get('/:username/profile', function(req, res, next) {
        if (req.params.username === res.locals.user.username) {
            res.render('profile', {
                title: "Profile: " + req.params.username,
                owner: res.locals.user
            });
        } else {
            res.render('profile', {
                title: "Profile: " + req.params.username,
            });
        }
    });
    
    router.get('/:username/profile/edit', function(req, res, next) {
        if (req.params.username === res.locals.user.username) {
            res.render('profileEdit', {
                title: "Profile: " + req.params.username + " | Streamers",
                owner: res.locals.user
            });
        } else {
            res.render('index', {
                notification: {
                    message: "Stop poking your nose where it doesn't belong.",
                    message_title: 'Access Denied'
                }
            });
        }
    });
    
    router.get('/test', function(req, res, next) {
        res.render('test', {
            title: "Never gonna give you up. | Streamers",
        });
    });
    
    router.get('/about', function(req, res, next) {
        res.render('about', {
            title: "About | Streamers",
            user: res.locals.user
        });
    });
    
    router.get('/login', function(req, res, next) {
        res.render('login', {
            title: "Log In | Streamers"
        });
    });
    
    router.post('/login', login);
    
    router.get('/register', function(req, res, next) {
        res.render('register', {
            title: "Register | Streamers"
        });
    });
    
    router.post('/register', registerUser);
    
    router.get('/nottest', function(req, res){
        res.render('chat', {
            title: "Not Test | Streamers"
        })
    });
    
    function registerUser(req, res, next) {
        if(req.body.inputPass != req.body.inputPassConf) {
            res.render('register', {
                title: 'Register',
                notification: {
                    message: "Passwords did not match.",
                    message_title: 'Check Password'
                }
            });
        } else {
        
         user.register(new user({
        username: req.body.inputUser
    }), req.body.inputPass, function(err, user) {
        if (err) {
            return res.render('register', {
                title: "Create a new account",
                notification: {
                    message: 'unable to register user: ' + err, 
                    message_title: 'Error'
                },
                user: user
            });
        }
            // Authenticate (log in) the new user.
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/');
                });
            });
        }
    }
    
    router.get('/logout', function(req, res){
        debug.log("User logged out.");
        req.logout();
        res.redirect('/');
    });
    
    function login(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render('login', {
                    title: "Log in",
                    notification: {
                        severity: 'error',
                        message: "The username and password you provided is incorrect. Please try again."
                    }
                });
            }
            // Log the user in and redirect to the homepage.
            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }
                debug.log("User " + user.username + " logged in.");
                return res.redirect('/');
            });
        })(req, res, next);
    }


    return router;
};