const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/protect')
const { login, register, getMe } = require('../controllers/user')

router.post('/login', login)
router.post('/register', register)
router.get('/me', protect, getMe)

module.exports = router
