// Load required packages
var mongoose = require('mongoose');

// Define our player schema
var MatchSchema = new mongoose.Schema({
	fixture_id: {type: String},
    leagueName : {type: String, required: true},
	date : {type: String, default: null},
	time: {type: String},
	score: {type: String, default: "0 - 0"},
	homeTeam: {type: String, required: true},
	homeID: {type: String},
	awayTeam: {type: String, required: true},
	awayID: {type: String}

}, { versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('Match', MatchSchema);
