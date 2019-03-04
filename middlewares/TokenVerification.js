const jwt = require('jsonwebtoken')

const TokenVerification = (req, res, next) => {
  const token = req.headers['x-auth-token']

  if (!token) {
    res.send('missing token header')
  }

  try {
    const decoded = jwt.verify(token, 'huss')
    const userName = decoded.userName
    res.userName = userName
    next()
  } catch (e) {
    res.send('invalid token')
  }
}

module.exports = TokenVerification
