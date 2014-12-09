var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var chat = require('./chat');

exports.setup = function(app, server) {
    var router = express.Router();

    var io = socketio.listen(server);
    var passportSocketIo = require('passport.socketio');
    //var sessionStore = require('express-session');
    var cookieParser = require('cookie-parser');

    var messages = [];
    var chats = [];
    var roster = [];

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: 'connect.sid',
        secret: 'old string',
        store: app.get('sessionStore')
    }));


    io.on('connection', function(socket) {
        socket.join('test');
        //console.log(socket.request.user.username + ' connected to chat');
        //io.emit('connected', socket.request.user.username);
        roster.push(socket.request.user.username);
        io.to('test').emit('connected', socket.request.user.username);

        chats.push(socket);

        socket.on('disconnect', function() {
            //console.log(socket.request.user.username + ' disconnected from chat');
            //io.emit('disconnected', socket.request.user.username);
            io.to('test').emit('disconnected', socket.request.user.username);
            chats.splice(chats.indexOf(socket), 1);
            roster.splice(roster.indexOf(socket.request.user.username), 1);
        });

        socket.on('abc', function(msg) {
            var text = String(msg);
            if (!text)
                return;
            console.log('message: ' + msg);
            io.to('test').emit('abc', {
                msg: msg,
                username: socket.request.user.username
            });
            messages.push(msg);
        });
    });

    function broadcast(event, data) {
        chats.forEach(function(socket) {
            console.log('broadcast: ' + data);
            socket.emit(event, data);
        });
    }

    return router;
};