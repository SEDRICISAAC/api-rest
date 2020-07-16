;
'use strict'

const express = require('express')
let api = express.Router()
const livingControl = require('../controller/living.controller')
const authenticateControl = require('../auth/autentication')

api.post('/postLiving', [authenticateControl.autentificar], livingControl.postLiving)
api.get('/getLivings', [authenticateControl.autentificar], livingControl.getLivings)
api.get('/getLivingById/:id', [authenticateControl.autentificar], livingControl.getLiving)
api.put('/putLiving/:id', [authenticateControl.autentificar], livingControl.putLiving)
api.delete('/deleteLiving/:id', [authenticateControl.autentificar], livingControl.deleteLiving)

module.exports = api
