const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator');

const News = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        min: [1, 'Too few characters'],
        max: [1000, 'Too long title']
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        min: [1, 'Too few characters'],
        max: [10000, 'Too long description']

    },
    url: {
        type: String
    },
    comment: [{
        text: { type: String },
        person: { type: String },
        date: { type: Date, default: Date.now }
    }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

News.plugin(uv);

module.exports = mongoose.model('New', News);