const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = mongoose.model('blogs', blogSchema)