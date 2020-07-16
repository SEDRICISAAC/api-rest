;
'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseModel = new Schema({
    title: { type: String },
    teacher: { type: String },
    description: { type: String },
    schedule: { type: String },
    sessionID: { type: String },
});

module.exports = mongoose.model('course', courseModel);