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
var user = require('../Models/user');
var passport = require('passport');

exports.setup = function(app) {
    var router = express.Router();
    
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
            title: "Home | Chatters",
            user: res.locals.user
        });
    });
    
    router.get('/:username/profile', function(req, res, next) {
        if (req.params.username === res.locals.user.username) {
            res.render('profile', {
                title: "Profile: " + req.params.username + " | Chatters",
                owner: res.locals.user
            });
        } else {
            res.render('profile', {
                title: "Profile: " + req.params.username + " | Chatters",
            });
        }
    });
    
    router.get('/:username/profile/edit', function(req, res, next) {
        if (req.params.username === res.locals.user.username) {
            res.render('profileEdit', {
                title: "Profile: " + req.params.username + " | Chatters",
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
            title: "LOL | Chatters",
        });
    });
    
    router.get('/about', function(req, res, next) {
        res.render('about', {
            title: "About | Chatters",
            user: res.locals.user
        });
    });
    
    router.get('/login', function(req, res, next) {
        res.render('login', {
            title: "Log In | Chatters"
        });
    });
    
    router.post('/login', login);
    
    router.get('/register', function(req, res, next) {
        res.render('register', {
            title: "Register | Chatters"
        });
    });
    
    router.post('/register', registerUser);
    
    router.get('/chat', function(req, res){
        res.render('chat', {
            title: "Chat | Chatters",
            chat: true
        })
    });
    
    function registerUser(req, res, next) {
        if(req.body.inputPass != req.body.inputPassConf) {
            res.render('register', {
                title: 'Register | Chatters',
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
                title: "Register | Chatters",
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
    
    router.get('/joinroom', function(req, res, next) {
        res.render('joinRoom', {
            title: "Join Room | Chatters"
        });
    });
    
    router.post('/joinroom', joinRoom);
    
    
    
    function joinRoom(req, res, next) {
        req.user.findRoom(req.body.roomName, req.body.owner, function(err, chat) {
            if(chat){
                res.redirect('/' + chat.owner + '/' + chat.name);
            }
            else {
                res.render('joinRoom', {
                    title: "Join Room | Chatters",
                    notification: {
                        message_title: "Error",
                        message: "Requested room does not exist.",
                        severity: "error"
                    }
                });
            }
        });
    }
    
    router.get('/createroom', function(req, res, next) {
        res.render('createRoom', {
            title: "Create Room | Chatters"
        });
    });
    
    router.post('/createroom', createRoom);
    
    function createRoom(req, res, next) {
        if (req.body.action === 'delete') {
            return deleteRoom(req, res, next);
        }

        req.user.findRoomById(req.params.id, function(err, chat) {
            if(req.body.roomName == 'profile'){
                res.render('createRoom', {
                    title: "Create Room | Chatters",
                    notification: {
                        message_title: "Error",
                        message: "Requested room name unavailable.",
                        severity: "warning"
                    }
                });
            }
            else {
                if(!chat) {
                    chat = req.user.newRoom();
                    chat.created = Date();
                }
        
                chat.set({
                   name: req.body.roomName
                });
        
                chat.save(function(err) {
                    if (err) {
                        res.render('createRoom', {
                            title: "Error Creating Room: " + chat.name + " | Chatters",
                            notification: {
                                message_title: "Error Creating Room " + chat.name,
                                message: err
                            }
                        });
                    } else {
                        res.redirect('/' + res.locals.user.username + '/' + req.body.roomName);
                    }
                });
            }
        });
    }
    
    router.get('/:username/:chatname', function(req, res, next){
        res.render('chat', {
            title: req.params.chatname + " | Chatters",
            owner: req.params.username,
            chat: true
        });
    });
    
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
                    title: "Log In | Chatters",
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