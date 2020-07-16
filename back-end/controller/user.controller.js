;
'use strict'
const fs = require('fs'),
    path = require('path'),
    connetDb = require('../config/db'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    usuarios_model = require('../models/users.model')


let getUsuario = (req, res) => {
    usuarios_model.find()
        .then(data => {
            res.status(200).json({
                data: data,
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
let insertOne = (req, res) => {
    nombre = req.body.nombre,
        apellido = req.body.apellido,
        edad = req.body.edad
    usuarios_model.create({ nombre, apellido, edad })
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

//insertar varios
let insertMany = (req, res) => {
    data = req.body.data
    usuarios_model.insertMany(data)
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


//Actualizar uno
let updateOne = (req, res) => {
    id = req.params.id,
        data = req.body.data
    usuarios_model.updateOne({ '_id': id }, { $set: data })
        .then((data) => {
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

//buscar por ID
//pruebale
let get_usuario_one = (req, res) => {
    id = req.params.id
    usuarios_model.find({ '_id': id })
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
            console.log(data)
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

//Delete varios
let deleteMany = (req, res) => {
    usuarios_model.deleteMany({})
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

//delete One
let deleteOne = (req, res) => {
        id = req.params.id
        usuarios_model.deleteOne({ '_id': id })
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
    //---------------------------------------------------------------------------------------

//ingresar usuarios con bcryp
let nuevoUsuario = (req, res) => {
    let usuario = req.body.usuario
    usuarios_model.create(usuario)
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


let login = (req, res) => {
    let data = req.body.data,
        email = data.email,
        password = data.password;
    usuarios_model.find({ email }).then((data) => {
            if (data[0].email === email) {
                let tokenBody = {
                        email: data[0].email,
                        rol: data[0].rol,
                        name: data[0].name,
                    },
                    token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                        algorithm: "HS256",
                        expiresIn: 6000,
                    });
                bcrypt.compareSync(password, data[0].passw) ?
                    res.status(200).json({
                        token,
                    }) :
                    res.status(404).json({
                        ok: false,
                        data: null,
                        msg: "Password incorrecto",
                    });
            } else {
                return res.status(404)
            }
        })
        .catch((err) => {
            return res.status(404).json({
                ok: false,
                data: null,
                msg: "Email incorrecto",
            });
        });

};


module.exports = {
    getUsuario,
    insertOne,
    insertMany,
    updateOne,
    get_usuario_one,
    deleteMany,
    deleteOne,
    nuevoUsuario,
    login
}