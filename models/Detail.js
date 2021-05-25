const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const DetailSchema = new Schema({
  iid: String,
  result: Object
})

module.exports = Detail = mongoose.model('Details', DetailSchema)