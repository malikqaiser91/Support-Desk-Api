const Ticket = require('../model/Ticket')
const asyncHandler = require('../util/async')
const ErrorResponse = require('../util/ErrorResponse')

const getTickets = asyncHandler(async (req, res, next) => {
  const tickets = await Ticket.find({}).sort('-createdAt')
  return res.status(200).json({
    success: true,
    count: tickets.length,
    data: tickets,
  })
})

const getTicket = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id)
  //  validate user
  if (ticket.user.toString() !== req.user._id.toString())
    return next(
      new ErrorResponse(`User not authorize to perform this action`, 403)
    )
  if (!ticket)
    return next(
      new ErrorResponse(`No ticket found with the id ${req.params.id}`, 404)
    )

  return res.status(200).json({
    success: true,
    data: ticket,
  })
})

const createTicket = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body
  if (!product || !description)
    return next(new ErrorResponse(`Please include all the required`, 400))
  const ticket = new Ticket({
    user: req.user._id,
    product,
    description,
  })
  await ticket.save()
  return res.status(201).json({
    success: true,
    data: ticket,
  })
})

const updateTicket = asyncHandler(async (req, res, next) => {
  let ticket = await Ticket.findById(req.params.id)
  if (!ticket)
    return next(
      new ErrorResponse(`No ticket found with the id ${req.params.id}`, 404)
    )
  //  validate user
  if (ticket.user.toString() !== req.user._id.toString())
    return next(
      new ErrorResponse(`User not authorize to perform this action`, 403)
    )
  ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  return res.status(200).json({
    success: true,
    data: ticket,
  })
})

const deleteTicket = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket)
    return next(
      new ErrorResponse(`No ticket found with the id ${req.params.id}`, 404)
    )
  //  validate user
  if (ticket.user.toString() !== req.user._id.toString())
    return next(
      new ErrorResponse(`User not authorize to perform this action`, 403)
    )
  await ticket.remove()
  return res.status(200).json({
    success: true,
    data: {},
  })
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
}
