var mongoose = require('mongoose');
var chat = require('./chat');

// Define the schema for a user
var user = new mongoose.Schema({
    /*
    username - field to hold a string of the email that the user will use to log.
    in with
    */
    username: {type: String, required: true, index: { unique: true}}
    //password and salt are created by passport.
});

user.plugin(require('passport-local-mongoose'));

user.methods.findRoomById = function(id, callback) {
    return chat.findOne({
        owner_id: this._id,
        _id: id
    }, callback);
};

user.methods.newRoom = function() {
    var room = new chat();
    room.owner_id = this._id;
    room.owner = this.username;
    return room;
};

user.methods.findRoom = function (roomName, owner, callback){
    return chat.findOne({
        name: roomName,
        owner: owner
    }, callback);
};

// Export the model
var users = mongoose.model('user', user);
module.exports = users;