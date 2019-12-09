const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

var ratingSchema = mongoose.Schema({
    id: Number,
    company: String,
    buySummary: String,
    sellSummary: String,
    buyRating: String,
    sellRating: String,
    holdRating: String,
})


var Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;