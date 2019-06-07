// Load required packages
var mongoose = require('mongoose');

// Define our player schema
var TeamSchema = new mongoose.Schema({
	team_id: {type: String},
    name : {type: String, required: true},
	code : {type: String, default: ""},
	logo: {type: String, default: ""},
	league_id: {type: String, required: true}


}, { versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('Team', TeamSchema);
