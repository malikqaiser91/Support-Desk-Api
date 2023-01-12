const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/protect')
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticket')

// re-route into note route
const noteRoute = require('../routes/note')
router.use('/:ticketId/note', noteRoute)

router.use(protect)

router.route('/').get(getTickets).post(createTicket)

router.route('/:id').get(getTicket).put(updateTicket).delete(deleteTicket)

module.exports = router
