const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const OrderSchema = new Schema({
  name: String,
  goods: Array
})

module.exports = Order = mongoose.model('orders', OrderSchema)