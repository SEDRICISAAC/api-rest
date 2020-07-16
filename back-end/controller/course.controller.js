;
'use strict'
const fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcrypt'),
    jwt = require("jsonwebtoken"),
    courseModel = require('../models/course.model');

let getCourse = (req, res) => {
    courseModel.find()
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

//insertar uno
let newCourse = (req, res) => {
    let course = req.body.data
    courseModel.create(course)
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })

}

let deleteOne = (req, res) => {
    id = req.params.id
    courseModel.deleteOne({ '_id': id })
        .then(data => {
            res.status(200).json({
                msg: `${data.deletedCount}`,
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

let updateOne = (req, res) => {
    let _id = req.params.id,
        data = req.body.data;
    courseModel.updateOne({ '_id': _id }, { $set: data })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ready",
                token: req.token,
            });
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err,
            });
        });
};
module.exports = {
    getCourse,
    newCourse,
    deleteOne,
    updateOne
}