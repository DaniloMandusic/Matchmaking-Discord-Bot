const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: false },
    playerUsername: {type: String, require: true},
    playerRank: {type: String, require: false},
    discordName: {type: String, require: true, unique: false},
    playerLevel: {type: Number, require: false, unique: false}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;