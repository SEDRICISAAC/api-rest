;
'use strict'
const express = require('express'),
    // multiParty = require('connect-multiparty'),
    // passwordcontrol = require('../auth/password'),
    // rolescontrol = require('../auth/rol')
    autenticacioncontrol = require('../auth/autentication')
let api = express.Router(),
    // rolControl = require('../auth/rol')
    courseControl = require('../controller/course.controller');

api.post('/new_course', courseControl.newCourse)
api.get('/course', autenticacioncontrol.autentificar, courseControl.getCourse)
api.put('/update_course/:id', autenticacioncontrol.autentificar, courseControl.updateOne)
api.delete('/delete_course/:id', autenticacioncontrol.autentificar, courseControl.deleteOne)
module.exports = api