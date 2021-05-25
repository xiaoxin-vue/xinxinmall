const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const RecommendSchema = new Schema({
  RecommendGoods: Object
})

module.exports = Recommend = mongoose.model('Recommends', RecommendSchema)