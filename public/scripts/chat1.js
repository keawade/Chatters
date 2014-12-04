console.log("Loaded script");
var socket = io();

$('form').submit(function() {
    var mes = $('#m-in').val();

    console.log('Submitted "' + mes + '"');
    socket.emit('abc', mes);
    $('#m-in').val('');
    return false;
});

socket.on('abc', function(msg) {
    $('#messages').append($('<li class="m-user">').text(msg.username + ": "));
    $('li:last').append($('<div class="m-chat">').text(msg.msg));
});

socket.on('connected', function(name) {
    $('#messages').append($('<li class="m-status">').text(name + " connected"));
});

socket.on('disconnected', function(name) {
    $('#messages').append($('<li class="m-status">').text(name + " disconnected"));
});