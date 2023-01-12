const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  ticket: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket',
  },
  text: {
    type: String,
    required: [true, 'Note text is required'],
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  staffId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Note', NoteSchema)
