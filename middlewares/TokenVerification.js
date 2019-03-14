const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config')

const TokenVerification = (req, res, next) => {
  const token = req.headers['x-auth-token']

  if (!token) {
    res.send('missing token header')
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT.SECRET)
    const userName = decoded.userName
    res.userName = userName
    next()
  } catch (e) {
    res.send('invalid token, please login again!')
  }
}

module.exports = TokenVerification
