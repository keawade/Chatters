var mongoose = require('mongoose');

// Define the schema for a chat
var chatRoom = new mongoose.Schema({

    name: {type: String, required: true},
	owner: {type: String, required: true},
	messages: [Object],
	mods: [String],
	members: [String],
	whitelist: Boolean,
	bans: [String],
	owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    created: Date
});

// Export the model
var chat = mongoose.model('room', chatRoom);
module.exports = chat;