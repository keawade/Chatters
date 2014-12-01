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
    $('#messages').append($('<li class="m-chat">').text(msg));
});