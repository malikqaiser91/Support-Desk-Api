const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User Id creating the ticket is required'],
  },
  product: {
    type: String,
    required: [true, 'Product name is required'],
    enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  status: {
    type: String,
    enum: ['new', 'open', 'closed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Ticket', TicketSchema)
