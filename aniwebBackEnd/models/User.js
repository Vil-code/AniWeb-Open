const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator');

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    validate: [validator.isAlphanumeric, 'Usernames can only have letters and numbers.']
  },
  passwordHash: {
    type: String,
    required: [true, 'Enter a password.'],
    minlength: 3
  },
  comments: [
    {
      type: String
    }
  ],
  animes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anime',
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anime',
    }
  ],
  commentsN: [
    {
      type: String
    }
  ],
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'New',
    }
  ],
  joined: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: String,
    default: 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/b815342-HyBArQJNerBA.png',
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {

  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash

  }
})

module.exports = mongoose.model('User', userSchema);


