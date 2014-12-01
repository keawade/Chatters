var mongoose = require('mongoose');

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

// Export the model
var users = mongoose.model('user', user);
module.exports = users;