const express = require('express')
const router = express.Router()

const Authentication = require('../controllers/Authentication')
const TokenVerification = require('../middlewares/TokenVerification')

router.post('/register', function (req, res, next) {
  new Authentication(req, res).register()
})

router.post('/login', function (req, res, next) {
  new Authentication(req, res).login()
})

router.get('/profile/:userName', TokenVerification, function (req, res, next) {
  new Authentication(req, res).profile()
})

module.exports = router
