const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    age: String
});

module.exports = mongoose.model('users', userSchema);