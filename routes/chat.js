//var async = require('async');
var socketio = require('socket.io');
var express = require('express');

exports.setup = function(app, server) {
    var router = express.Router();
    
    var io = socketio.listen(server);
    var passportSocketIo = require('passport.socketio');
    //var sessionStore = require('express-session');
    var cookieParser = require('cookie-parser');

    var messages = [];
    //var sockets = [];
    
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',
    secret: 'old string',
    store: app.get('sessionStore')
  }));
    
    
    io.on('connection', function (socket) {
        console.log(socket.request.user.username + ' connected to chat');
        io.emit('connected', socket.request.user.username);
        messages.forEach(function (message) {
          socket.emit('abc', {
            msg: message,
            username: "past chat"
          });
        })
    
      //sockets.push(socket);
    
      socket.on('disconnect', function () {
        console.log(socket.request.user.username + ' disconnected from chat');
        io.emit('disconnected', socket.request.user.username);
        //sockets.splice(sockets.indexOf(socket), 1);
        //updateRoster();
      });
  
      socket.on('abc', function (msg) {
        var text = String(msg);
        if (!text)
          return;
        console.log('message: ' + msg); 
        io.emit('abc', {
          msg: msg,
          username: socket.request.user.username
        });
        messages.push(msg);
      });
    });
    /*
    function updateRoster() {
      async.map(
        sockets,
        function (socket, callback) {
          socket.on('name', callback);
        },
        function (err, names) {
          broadcast('roster', names);
        }
      );
    }
    
    function broadcast(event, data) {
      sockets.forEach(function (socket) {
        console.log('broadcast: ' + data);
        socket.emit(event, data);
      });
    }
    */
    return router;
};