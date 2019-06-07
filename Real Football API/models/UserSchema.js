// Load required packages
var mongoose = require('mongoose');

// Define our player schema
var UserSchema = new mongoose.Schema({
	userID: {type: String, required: true},
    name : {type: String, default: ""},
    email: {type: String, default: ""},
    picture: {type: String, default: ""},
    teams: {type: Array, default: []},
    players: {type: Array, default: []},
    leagues: {type: Array, default: []}

}, { versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
