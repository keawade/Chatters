var async = require('async');
var socketio = require('socket.io');
var express = require('express');

exports.setup = function(app, server) {
    var router = express.Router();
    
    var io = socketio.listen(server);

    var messages = [];
    var sockets = [];
    
    io.on('connection', function (socket) {
       console.log('a user connected');
        messages.forEach(function (data) {
          socket.emit('abc', data);
        });
    
        sockets.push(socket);
    
       socket.on('disconnect', function () {
       console.log('a user disconnected');          
          sockets.splice(sockets.indexOf(socket), 1);
          updateRoster();
        });  
    
        socket.on('abc', function (msg) {
          var text = String(msg || '');
          console.log('message: ' + msg);     
          io.emit('abc', msg);
          if (!text)
            return;  
    
          socket.on('name', function (err, name) {
            var data = {
              name: name,
              text: text
            };   
    
            broadcast('abc', data);
            messages.push(data);
          });  
        });
    
        socket.on('identify', function (name) {
          socket.set('name', String(name || 'Anonymous'), function (err) {
            updateRoster();
          });
        });
      });
    
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

    return router;
};