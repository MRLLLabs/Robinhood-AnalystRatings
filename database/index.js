const mongoose = require('mongoose');
const mongoUri = 'mongodb://database/';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = db;