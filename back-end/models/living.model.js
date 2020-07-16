;
'use strict'

const mongoose = require('mongoose')
const {Schema} = mongoose

const LivingSchema = new Schema({
    ip: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('livings', LivingSchema)
