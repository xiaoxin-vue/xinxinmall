const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const HomeSchema = new Schema({
  goods: Object
})

module.exports = Home = mongoose.model('Homes', HomeSchema)