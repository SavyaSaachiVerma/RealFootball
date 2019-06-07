// Load required packages
var mongoose = require('mongoose');

// Define our player schema
var PlayerSchema = new mongoose.Schema({
    name : {type: String, required: true},
	dateOfBirth : {type: String, default: null},
	club: {type: String, required: true},
    nationality: {type: String, default: null},
    position: {type: String, default: null},
    shirtNumber: {type: Number, default: null},
    image: {type: String, default: ""}
}, { versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('Player', PlayerSchema);
