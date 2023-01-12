module.exports = (req, res, next) => {
  const message = `No route found with the url ${req.protocol}://${req.get(
    'host'
  )}${req.originalUrl}`
  return res.status(404).json({
    success: false,
    message,
  })
}
