;
'use strict'
const express = require('express'),
    multiParty = require('connect-multiparty')
let api = express.Router(),
    filesControl = require('../controller/files.controller'),
    galeriaMiddLeware = multiParty({ uploadDir: './files/gallery' }),
    pdfMiddLeware = multiParty({ uploadDir: './files/pdf' })
    
api.post('/upload_galeria', galeriaMiddLeware, filesControl.uploadFile)
api.post('/upload_pdf', pdfMiddLeware, filesControl.uploadFile)
api.get('/file_galeria/:directorio/:urlFile', filesControl.verFile)
api.delete('/delete_file_galeria/:directorio/:urlFile', filesControl.deletFile)
api.put('/update_file_galeria/:directorio/:urlFile', galeriaMiddLeware, filesControl.updateFile)


module.exports = api