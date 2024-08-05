const upload = require('../../multerConfig')

module.exports = (app) => {
    const router = require('express').Router()
    const controller = require('../contollers/pegawais')

    router.get('/pegawais', controller.getPegawai)
    router.post('/pegawais/add', upload.single('foto'), controller.postPegawai)
    router.put('/pegawais/:id', controller.editPegawai)
    router.delete('/pegawais/:id', controller.deletePegawai)
    router.get('/pegawais/unit-kerja/:unitKerjaId', controller.getPegawaiByUnitKerja)

    app.use('/api', router)

    return router
}