const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = db;