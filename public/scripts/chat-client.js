console.log("Loaded script");
var socket = io.connect();

var room = document.location.pathname;
socket.emit('join', room);

$('form').submit(function() {
    var mes = $('#m-in').val();

    console.log('Submitted "' + mes + '"');
    socket.emit('abc', mes);
    $('#m-in').val('');
    return false;
});

function scroll(){
//    var item = document.getElementById('#messages').lastChild;
//    item.scrollIntoView();
    document.getElementsByTagName('input')[0].scrollIntoView();
    
//    var objDiv = document.getElementById("messages");
//    objDiv.scrollTop = objDiv.scrollHeight;
    
//    $("#messages").scrollTop($("#messages")[0].scrollHeight);
}

socket.on('abc', function(msg) {
    $('#messages').append($('<li class="m-user">').text(msg.timeStamp + " " + msg.username + ": "));
    $('li:last').append($('<p class="m-chat">').text(msg.msg));
    scroll();
});

socket.on('connected', function(name) {
    $('#' + name).remove();
    $('#roster1').append($('<div id="' + name + '">').text(name));
});

socket.on('disconnected', function(name) {
    $('#' + name).remove();
});