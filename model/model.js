const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ShortURL = mongoose.model('ShortURL', urlSchema);

module.exports = ShortURL;