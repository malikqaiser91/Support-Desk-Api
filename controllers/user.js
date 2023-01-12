const bcrypt = require('bcryptjs')
const User = require('../model/User')
const generateToken = require('../util/generateToken')
const asyncHandler = require('../util/async')
const ErrorResponse = require('../util/ErrorResponse')

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return next(
      new ErrorResponse('Please include all the required fields', 400)
    )
  const userExist = await User.findOne({ email })
  if (userExist)
    return next(
      new ErrorResponse(`User already exists with the email ${email}`, 400)
    )
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({
    name,
    email,
    password: hashedPassword,
  })
  await user.save()
  return res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token: generateToken(user._id),
  })
})

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return next(new ErrorResponse('Invalid Credentials', 400))
  const comparePassword = await bcrypt.compare(password, user.password)
  if (user && comparePassword) {
    return res.status(200).json({
      success: true,
      token: generateToken(user._id),
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Invalid Credentials',
    })
  }
})

const getMe = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
      isAdmin: req.user?.isAdmin,
    },
  })
})

module.exports = {
  login,
  register,
  getMe,
}
