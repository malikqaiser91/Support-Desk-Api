const jwt = require('jsonwebtoken')
const User = require('../model/User')
const asyncHandler = require('../util/async')
const ErrorResponse = require('../util/ErrorResponse')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers?.authorization &&
    req.headers?.authorization?.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.user.id)
      req.user = user
      next()
    } catch (err) {
      console.log('JWT Error', err.message)
      return next(new ErrorResponse('Invalid Token, Not Authorized', 401))
    }
  }
  if (!token) {
    return next(new ErrorResponse('No Token, Not Authorized', 401))
  }
})

module.exports = {
  protect,
}
