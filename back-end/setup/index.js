;
'use strict'

const env = require('dotenv').config(),
    app = require('./app'),
    port = process.env.PORT || 3000

let http = require('http').Server(app),
    io = require('../sockets/socketControlls')(http)

http.listen(port, (e) => {
    if (!e) {
        console.log(`The port rose in https://localhost:${port}`)
    } else {
        console.log('El servicio no esta funcionando')
    }
})