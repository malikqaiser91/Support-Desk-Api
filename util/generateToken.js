const jwt = require('jsonwebtoken')

module.exports = (_id) => {
  const payload = {
    user: {
      id: _id,
    },
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  })
}
