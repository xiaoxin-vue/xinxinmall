const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CategorySchema = new Schema({
  goods: Object
})

module.exports = Category = mongoose.model('Categorys', CategorySchema)