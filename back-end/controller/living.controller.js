;
'use strict'

const Living = require('../models/living.model')

let postLiving = async (req, res) => {
    let living = req.body.living
    if (!living.ip || !living.password) {
        res.send('Debe completar todos los campos')
    } else {
        let newLiving = new Living(living)
        await newLiving.save()
            .then(() => {
                res.status(200).send('Sala creada')
            }).catch(e => {
                res.status(500).send(e)
            })
    }
}

let getLivings = async (req, res) => {
    let livings = await Living.find()
    if (livings) {
        res.status(200).json({
            ok: true,
            livings
        })
    } else if (livings.length === 0) {
        res.send('No hay ninguna sala creada')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let getLiving = async (req, res) => {
    let id = req.params.id
    let living = await Living.findById({_id: id})
    if (living) {
        res.status(200).json({
            ok: true,
            living
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let putLiving = async (req, res) => {
    let id = req.params.id
    let living = req.body.living
    let putLiving = await Living.findByIdAndUpdate({_id: id}, {
        $set: {ip: living.ip, password: living.password}
    }, {new: true})
    if (putLiving) {
        res.status(200).json({
            ok: true,
            putLiving,
            sms: 'Sala actualizada'
        })
    } else {
        res.send('Algo salió mal')
    }
}

let deleteLiving = async (req, res) => {
    let id = req.params.id
    let deleteLiving = await Living.deleteOne({_id: id})
    if (deleteLiving) {
        res.status(200).json({
            ok: true,
            sms: 'Sala eliminada'
        })
    } else {
        res.send('Algo salió mal')
    }
}

module.exports = {
    postLiving,
    getLivings,
    getLiving,
    putLiving,
    deleteLiving
}
