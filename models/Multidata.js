const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MultidataSchema = new Schema({
  goods: Object
})

module.exports = Multidata = mongoose.model('Multidatas', MultidataSchema)