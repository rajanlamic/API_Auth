// const express = require('express')
import express from 'express'
const router = express.Router()

const Authentication = require('../controllers/Authentication')
import TokenVerification from '../middlewares/TokenVerification'

router.post('/register', function (req: any, res: any, next:any) {
  new Authentication(req, res).register()
})

router.post('/login', function (req:any, res:any, next:any) {
  new Authentication(req, res).login()
})

router.get('/profile/:userName', TokenVerification, function (req:any, res:any, next:any) {
  new Authentication(req, res).profile()
})

module.exports = router
