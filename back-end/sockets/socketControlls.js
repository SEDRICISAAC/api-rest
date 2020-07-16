;
'use strict'

let gestionDocumentos = (http) => {
    let io = require('socket.io')(http),
        socketjwt = require('socketio-jwt')
    io.use(socketjwt.authorize({
        secret: process.env.KEY_JWT,
        handshake: true
    }))
    const gestionDatos = {}
    io.on('connection', socket => {
        let anteriorId
        const safeJoin = actualId => {
            //salir de la sala
            socket.leave(anteriorId)
                //unirme a sala
            socket.join(actualId)
        }
        socket.on('getDoc', docId => {
            safeJoin(docId)
            socket.emit('gestionDato', gestionDatos[docId])
        })
        socket.on('addDoc', doc => {
            let salas = Object.keys(gestionDatos)
            let numeroDeSalas = salas.length + 1
            let nombreSala = `documento ${numeroDeSalas}`
            doc.id = nombreSala
            gestionDatos[doc.id] = doc
            safeJoin(doc.id)
            io.emit('gestionDatos', Object.keys(gestionDatos))
            socket.emit('gestionDato', doc)
        })
        socket.on('editDoc', doc => {
            gestionDatos[doc.id] = doc
            socket.to(doc.id).emit('gestionDato', doc)
        })
        io.emit('gestionDatos', Object.keys(gestionDatos))
    })
}

module.exports = gestionDocumentos