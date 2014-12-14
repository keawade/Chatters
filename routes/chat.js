var async = require('async');
var socketio = require('socket.io');
var express = require('express');

exports.setup = function(app, server) {
  var router = express.Router();

  var io = socketio.listen(server);
  var passportSocketIo = require('passport.socketio');
  //var sessionStore = require('express-session');
  var cookieParser = require('cookie-parser');

  var chats = [];
  var roster = [];

  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',
    secret: 'old string',
    store: app.get('sessionStore')
  }));


  io.on('connection', function(socket) {
    //    socket.join('test');
    //console.log(socket.request.user.username + ' connected to chat');
    //io.emit('connected', socket.request.user.username);
    //    io.to('test').emit('connected', socket.request.user.username);

    //    chats.push(socket);

    socket.on('join', function(room) {
      roster.push(socket.request.user.username);
      console.log(roster);
      socket.room = room;
      socket.join(socket.room);
      console.log("%s joined %s", socket.request.user.username, socket.room);
      roster.forEach(function(person) {
        io.to(socket.room).emit('connected', person);
      })
    });

    socket.on('disconnect', function() {
      //console.log(socket.request.user.username + ' disconnected from chat');
      //io.emit('disconnected', socket.request.user.username);
      io.to(socket.room).emit('disconnected', socket.request.user.username);
      socket.leave(socket.room);
      console.log("%s left %s", socket.request.user.username, socket.room);
//      chats.splice(chats.indexOf(socket), 1);
      roster.slice(roster.indexOf(socket.request.user.username), (roster.indexOf(socket.request.user.username) + 1));
    });

    socket.on('abc', function(msg) {
  //    var max = 100;
      var text = String(msg);
  //    var text = text1.substring(0, Math.min(max, text1.length));
      if (!text)
        return;
      console.log("%s | %s: %s", socket.room, socket.request.user.username, text);
      var mydate = new Date();
      var h = mydate.getHours();
      var m = mydate.getMinutes();
      var s = mydate.getSeconds();
      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }
      if (s < 10) {
        s = '0' + s;
      }
      io.to(socket.room).emit('abc', {
        msg: text,
        username: socket.request.user.username,
        timeStamp: h + ":" + m + ":" + s
      });
      var room = socket.room.split('/');
      socket.request.user.findRoom(room[2], room[1], function(err, chat) {
        chat.update(
          {_id: chat._id},
          {$push: {"messages": {username: socket.request.user.username, message: text, timeStamp: mydate}}}
        )
        console.log(chat);
      });
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