const Note = require('../model/Note')
const Ticket = require('../model/Ticket')
const asyncHandler = require('../util/async')
const ErrorResponse = require('../util/ErrorResponse')

const getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find({ ticket: req.params.ticketId }).sort(
    '-createdAt'
  )
  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket)
    return next(
      new ErrorResponse(`No ticket found with id ${req.params.ticketId}`, 404)
    )

  if (ticket.user.toString() !== req.user._id.toString())
    return next(new ErrorResponse(`User not allow to perform this action`, 403))

  if (notes.length === 0) return next(new ErrorResponse(`No note found`, 200))

  return res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  })
})

const addNote = asyncHandler(async (req, res, next) => {
  const { text } = req.body
  if (!text)
    return next(
      new ErrorResponse(`Please include all the required fields`, 400)
    )
  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket)
    return next(
      new ErrorResponse(`No ticket found with id ${req.params.ticketId}`, 404)
    )
  if (ticket.user.toString() !== req.user._id.toString())
    return next(new ErrorResponse(`User not allow to perform this action`, 403))

  const note = new Note({
    user: req.user._id,
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
  })
  await note.save()
  return res.status(201).json({
    success: true,
    data: note,
  })
})

module.exports = {
  getNotes,
  addNote,
}
