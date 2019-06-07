// Load required packages
var mongoose = require('mongoose');

// Define our player schema
var LeagueSchema = new mongoose.Schema({
    id: {type: String, required: true},
	name : {type: String, default: ""},
	country: {type: String, required: ""},
    season: {type: String, default: ""},
    seasonStart: {type: String, default: ""},
    seasonEnd: {type: String, default: ""},
    logo: {type: String, default: ""},
    flag: {type: String, default: ""}, 
    standings: {type: Boolean, default: true}
}, { versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('League', LeagueSchema);
