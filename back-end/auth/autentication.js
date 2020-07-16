;
'use strict'

const jwt = require('jsonwebtoken')


let autentificar = (req, res, next) => {
    let token = req.headers.authorization || null
    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            console.log(process.env.KEY_JWT)
            console.log(err)
            return res.status(404).json({
                data: null,
                msg: 'Token Inválido'
            })
        } else {
            req.decode = decode
            console.log(decode)
            console.log(process.env.KEY_JWT)
            let token = jwt.sign({ data: decode.data }, process.env.KEY_JWT, {
                algorithm: 'HS256',
                expiresIn: 6000
            });
            req.decode = decode;
            req.token = token;

            next();
        }
    })
}
module.exports = {
    autentificar
}