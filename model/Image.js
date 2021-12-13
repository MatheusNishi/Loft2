const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
});

module.exports = mongoose.model('Image', imageSchema);