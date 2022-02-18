const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator');


mongoose.set('useFindAndModify', false)

const Anime = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Enter the name of the anime.'],
        min: [1, 'Too few characters'],
        max: [1000, 'Too long title']
    },
    description: {
        type: String,
        min: [1, 'Too few characters'],
        max: [10000, 'Too long description'],
        required: true

    },
    genres: {
        type: String,
        required: [true, 'Enter the genres of the anime.']
    }
    ,
    url: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
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
    },
    date: {
        type: Date,
        default: Date.now
    }
})

Anime.plugin(uv);

module.exports = mongoose.model('Anime', Anime);