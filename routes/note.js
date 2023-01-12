const express = require('express')
const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/protect')
const { getNotes, addNote } = require('../controllers/note')

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
